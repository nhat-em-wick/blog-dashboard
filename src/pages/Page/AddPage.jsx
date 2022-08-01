import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setHeading } from "~/redux/headingSlice";
import Card from "~/components/Card";

import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import { FaCloudUploadAlt } from "react-icons/fa";
import { FormText, FormCheckbox } from "~/components/Form";
import Title from "~/components/Title";
import pagesApi from "~/api/pagesApi";
import uploadImage from "~/feature/uploadImage";
import Button from "~/components/Button";
import { notifySuccess, notifyError } from "~/components/Toast";
import { useNavigate } from "react-router-dom";

function AddPage() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState("");

  const handleEditorChange = (e) => {
    setEditorState(e);
  };

  const handleSetTitle = (value) => {
    setTitle(value);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setHeading("Thêm trang"));
  }, []);

  const handleSubmit = async () => {
    if (!title || title === "") {
      return alert("Thiếu tiêu đề");
    }
    try {
      const data = {
        title: title.trim(),
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      };
      const response = await pagesApi.create(data);
      setTitle("");
      setEditorState(() => EditorState.createEmpty());
      notifySuccess("Thành công");
    } catch (error) {
      notifyError(`có lỗi xảy ra: ${error.data.error.message}`)
    }
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
        <div className="col l-12">
          <div className="row">
            <div className="col l-12">
              <Card>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <Title style={{ marginBottom: "0" }} title="Tiêu đề" />
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    <Button
                      onClick={() => navigate(-1)}
                      classNames="btn btn-outline-primary btn-xs"
                    >
                      Quay lại
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      classNames="btn btn-primary btn-xs"
                    >
                      Thêm trang mới
                    </Button>
                  </div>
                </div>
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
                    editorState={editorState}
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
      </div>
    </div>
  );
}

export default AddPage;
