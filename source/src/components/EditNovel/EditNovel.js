import React, { useState, useEffect } from "react";
import NovelDropImage from "../NovelDropImage/NovelDropImage";
import { uploadImage } from "../../backend-api/API";
import "./EditNovel.css";

const EditNovel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState([]);

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => (file => URL.revokeObjectURL(file.preview));
  }, [img]);

  // Dummy function to test uploadImage
  const confirmUpload = () => {
    if(selectedFile !== null)
      uploadImage(selectedFile).then((url) => console.log(url))
  };

  const handleDrop = (acceptedFiles) => {
    // Set the selected file first then after hitting 'Save' we will upload
    setSelectedFile(acceptedFiles[0]);
    
    // Set the preview image
    setImg(Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])})
    );
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const submitNovel = () => {
    console.log(title, description, selectedFile.name);
  };

  return (
    <div className="edit-novel">
      <div className="edit-novel-image">
        <NovelDropImage onDrop={handleDrop} className="novel-drop-image" img={img.preview} />
        <button onClick={confirmUpload}>Save</button>
      </div>
      <div className="edit-novel-input">
        <div>
        <p className="text">Novel title</p>
        <input
          type="text"
          className="input-box"
          style={{ fontSize: "17px" }}
          maxLength={60}
          onChange={handleTitle}
        />
        </div>

        <p className="text">Genre</p>

        <div>
        <p className="text">Description</p>
        <textarea
          type="text"
          className="input-box"
          style={{ height: "200px" }}
          maxLength={500}
          onChange={handleDescription}
        />
        </div>

        <button onClick={submitNovel}>Submit</button>
      </div>
    </div>
  );
};

export default EditNovel;
