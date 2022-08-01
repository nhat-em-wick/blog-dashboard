import { useEffect, useState } from "react";
import styles from "./Blog.module.scss";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";
import { setHeading } from "~/redux/headingSlice";
import Card from "~/components/Card";
import { useParams } from "react-router-dom";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FormText, FormCheckbox } from "~/components/Form";
import Title from "~/components/Title";
import postsApi from "~/api/postsApi";
import uploadImage from "~/feature/uploadImage";
import Button from "~/components/Button";
import categoriesApi from "~/api/categoriesApi";
import {notifySuccess, notifyError} from '~/components/Toast'
import { v4 as uuidv4 } from "uuid";

const cx = classNames.bind(styles);

function EditPost() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  
  const {slug} = useParams()

  const handleEditorChange = (e) => {
    setEditorState(e);
  };

  const handleSetTitle = (value) => {
    setTitle(value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeading("sửa Bài viết"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const getCategoriesAndPost = async () => {
      try {
        const [resCate, resPost] = await Promise.all([categoriesApi.getAll(), postsApi.getBySlug(slug)])
        const convertContent = convertFromRaw(JSON.parse(resPost.element.content))
        setTitle(resPost.element.title)
        setThumbnail(resPost.element.thumbnail)
        setEditorState(() => EditorState.createWithContent(convertContent))
        setCategories(resCate.elements.categories);
        setChecked(() => {
          return resPost.element.categories.map((item) => item._id)
        })
      } catch (error) {
        throw new Error (error.response.data.error.message)
      }
    };
    getCategoriesAndPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  

  const handleSubmit = async () => {
    if(!title || title === '') {
      return alert('Thiếu tiêu đề')
    }
    if(thumbnail === undefined) {
      return alert('Thiếu ảnh đại diện')
    }
    try {
      const data = {
        title: title.trim(),
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        categories: checked,
        thumbnail: thumbnail,
      };
      const response = await postsApi.edit(slug,data);
      notifySuccess('Thành công')
    } catch (error) {
      console.error(error)
      notifySuccess('Có lỗi xảy ra')
    }
  };

  const handleChecked = (id) => {
    setChecked((prev) => {
      if (checked.includes(id)) {
        return checked.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  };

  const uploadImageCallback = async (file) => {
    try {
      const res = await uploadImage(file);
      return {
        data: { link: res },
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid">
      <div className="row">
        <div className="col l-9">
          <div className="row">
            <div className="col l-12">
              <Card>
                <Title title="Tiêu đề" />
                <FormText
                  placeholder={""}
                  name="title"
                  value={title}
                  onChange={(e) => handleSetTitle(e.target.value)}
                  size="lg"
                />
              </Card>
            </div>
            <div className="col l-12">
              <Card>
                <Title title="Nội dung" />
                <div className="content">
                  <Editor
                    editorState={(editorState)}
                    toolbarClassName="toolbar-class"
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    onEditorStateChange={handleEditorChange}
                    toolbar={{
                      image: {
                        uploadCallback: uploadImageCallback,
                        alt: {
                          present: true,
                          mandatory: true,
                        },
                      },
                    }}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="col l-3">
          <Card style={{ position: "sticky", top: "var(--header-height" }}>
            <div className={cx("sidebar")}>
              <section className={cx("sidebar-save")}>
                <Button
                  onClick={handleSubmit}
                  classNames="btn btn-primary btn-xs"
                >
                  Cập nhật bài viết
                </Button>
              </section>
              <section className={"sidebar-categories"}>
                <Title
                  title="Danh mục"
                  style={{ fontSize: "var(--h4-font-size)" }}
                />
                <ul className={cx("sidebar-categories")}>
                  {categories.map((item) => (
                    <li key={uuidv4()} className={cx("sidebar-category-item")}>
                      <FormCheckbox
                        onChange={() => handleChecked(item._id)}
                        checked={checked.includes(item._id)}
                      />
                      <span className={cx("sidebar-category-text")}>
                        {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className={cx("sidebar-thumbnail")}>
                <Title
                  title="Hình ảnh"
                  style={{ fontSize: "var(--h4-font-size)" }}
                />
                <UploadThumbnail
                  onThumbnailChange={(file) => setThumbnail(file)}
                  
                  thumbnail={thumbnail}
                />
              </section>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const UploadThumbnail = ({ onThumbnailChange, submitted, thumbnail }) => {
  const [fileImg, setFileImg] = useState();
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const newFile = e.target.files;
    setLoading(true);
    if (newFile) {
      try {
        const res = await uploadImage(newFile[0]);
        setLoading(false);
        setFileImg(res);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setFileImg(thumbnail)
  }, [thumbnail])

  useEffect(() => {
    if (onThumbnailChange) {
      onThumbnailChange(fileImg);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileImg]);

  useEffect(() => {
    setFileImg(undefined);
  }, [submitted])

  const fileRemove = () => {
    setFileImg(undefined);
  };

  return (
    <>
      <div className={cx("sidebar-thumbnail__file")}>
        {loading ? (
          <span className={cx("sidebar-thumbnail__file-uploading")}>
            Uploading...
          </span>
        ) : (
          <span className={cx("sidebar-thumbnail__file-icon")}>
            <FaCloudUploadAlt />
          </span>
        )}

        <input
          type="file"
          name=""
          id=""
          onChange={(e) => handleFileChange(e)}
        />
      </div>
      {fileImg && (
        <div className={cx("sidebar-thumbnail__preview")}>
          <img src={fileImg} alt="" />
          <span onClick={fileRemove}>
            <i className="bx bx-x"></i>
          </span>
        </div>
      )}
    </>
  );
};

UploadThumbnail.defaultProps = {
  onThumbnailChange: null,
};

export default EditPost;
