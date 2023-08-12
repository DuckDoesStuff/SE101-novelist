import React, { useState } from "react";
import NovelDropImage from "../components/NovelDropImage";
import { uploadImage } from "../backend-api/API";
import "./EditNovel.css";
import "../styles/styles.css";
import "./NovelDropImage.module.css";

const EditNovel = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    // Set the selected file first then after hitting 'Save' we will upload
    setSelectedFile(acceptedFiles[0]);
  };

  //Dummy function to test uploadImage
  const confirmUpload = () => {
    uploadImage(selectedFile).then((url) => console.log(url));
  };

  return (
    <div className="edit-novel">
      <div className="edit-novel-image">
        <NovelDropImage onDrop={handleDrop} className="novel-drop-image" />
        <button onClick={confirmUpload}>Save</button>
      </div>
      <div className="edit-novel-input">
        <p className="text">Novel title</p>
        <input type="text" className="input-box" />

        <p className="text">Genre</p>

        <p className="text">Description</p>
        <input type="text" className="input-box" style={{ height: "200px" }} />
      </div>
    </div>
  );
};

export default EditNovel;
