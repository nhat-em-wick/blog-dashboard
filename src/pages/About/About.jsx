import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setHeading } from "~/redux/headingSlice";
import Card from "~/components/Card";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import uploadImage from "~/feature/uploadImage";
import Button from "~/components/Button";
import Title from "~/components/Title";
import pagesApi from "~/api/pagesApi";
import { notifyError, notifySuccess } from "~/components/Toast";
import { useParams } from "react-router-dom";

const About = () => {
  const dispatch = useDispatch();
  const {slug} = useParams()
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleEditorChange = (e) => {
    setEditorState(e);
  };

  useEffect(() => {
    const getDataPage = async () => {
      try {
        const res = await pagesApi.getBySlug(slug)
      const convertContent = convertFromRaw(JSON.parse(res.element.content))
      setEditorState(() => EditorState.createWithContent(convertContent))
      } catch (error) {
        notifyError('co loi xay ra')
        console.error(error)
      }
    }
    getDataPage()
  }, [])
  

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

  const handleSubmit = async () => {
    try {
      const data = {
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      }
      const res = await pagesApi.edit(slug, data)
      notifySuccess('thanh cong')
    } catch (error) {
      console.error(error)
      notifyError('Cố lỗi xảy ra')
    }
  }

  return (
    <div className="grid">
      <div className="row">
        <div className="col l-9 l-o-1">
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <Title title={"Nội dung"} style={{ marginBottom: "0" }} />
              <Button onClick={handleSubmit} classNames="btn btn-primary btn-xs">Lưu nội dung</Button>
            </div>
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
