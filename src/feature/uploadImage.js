import axios from "axios";

const uploadImage = async (file) => {
  const typeFiles = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (typeFiles.includes(file.type)) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_NAME_UPLOAD_IMG);
    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/coder-nhatpro/upload",
        formData
      );
      return res.data.url;
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Hình ảnh không hợp lệ!!!");
    Promise.reject("File không hợp lệ!!!")
  }
};

export default uploadImage;
