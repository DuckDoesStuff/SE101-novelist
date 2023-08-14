import React, { useState, useEffect } from "react";
import EditNovel from "../components/EditNovel/EditNovel";
import EditChapter from "../components/EditChapter/EditChapter";
import { message } from "antd";
import Button from "../components/Button/Button";
import { uploadImage, pushNovel, emptyNovel, getNovel } from "../backend-api/API";
import { storage } from "../backend-api/FirebaseConfig";
import { deleteObject, ref } from "firebase/storage";
import "../styles/EditNovelPage.css";

const EditNovelPage = (props) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [img, setImg] = useState({ preview: "" });
  const [genre, setGenre] = useState([]);

  // Fetch novel data from backend
  const fetchNovel = (novelID) => {
    // fetch novel data from backend
    // set novel data

    getNovel(novelID)
    .then((data) => {
      setTitle(data.title);
      setDescription(data.description);
      setImagePath(data.image_path);
      setThumbnail(data.thumbnail);
      setImg({preview: data.thumbnail});
      setGenre(data.genre);
    })
  }

  const uploadMessage = (content, type, duration) => {
    messageApi.destroy();
    messageApi.open({
      content: content,
      type: type,
      duration: duration,
      style: {
        marginTop: '20px',
      }
    })
  }

  useEffect(() => {
    return () => fetchNovel(props.novelID);
  }, [props.novelID])


  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => (file => URL.revokeObjectURL(file.preview));
  }, [img]);

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

  const handleGenreClick = (buttonName) => {
    // If genre is already selected, remove it from the list
    // Else add it to the list
    if(genre.includes(buttonName)) {  
      setGenre(genre.filter((genre) => genre !== buttonName)); 
    } else {
      setGenre([...genre, buttonName]);
    } 
  }

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const [messageApi, notificationHolder] = message.useMessage();
  const submitNovel = () => {
    var message = "", type = "error", duration = 2;
    if(!title)
      message = "You need to fill out the title";
    else if(!description)
      message = "You need to fill out the description";
    else if(!img.preview)
      message = "You need to upload an image";
    else if(genre.length < 1)
      message = "You need to select at least one genre";
    else {
      message = "Uploading novel";
      type = "loading";
    }
    uploadMessage(message, type, duration);

    if(type === "loading") {
      var newNovel = emptyNovel();
      newNovel.title = title;
      newNovel.description = description;
      newNovel.genre = genre;
      newNovel.image_path = imagePath;
      newNovel.thumbnail = thumbnail;

      // Completely new novel
      if(newNovel.image_path === "" && newNovel.thumbnail === "" && selectedFile !== null) {
        uploadImage(selectedFile).then((result) => {
          newNovel.thumbnail = result.downloadURL;
          setThumbnail(result.downloadURL);
          newNovel.image_path = result.filePath;
          setImagePath(result.filePath);

          pushNovel(newNovel, props.novelID)
          uploadMessage("Successfully uploaded", "success", duration);
        });
      }
      // Update novel with new thumbnail
      else if(newNovel.image_path !== "" && newNovel.thumbnail !== "" && selectedFile !== null) {
        deleteObject(ref(storage, newNovel.image_path)).then(() => {
          uploadImage(selectedFile).then((result) => {
            newNovel.thumbnail = result.downloadURL;
            setThumbnail(result.downloadURL);
            newNovel.image_path = result.filePath;
            setImagePath(result.filePath);

            pushNovel(newNovel, props.novelID)
            uploadMessage("Successfully uploaded", "success", duration);
          });
        });
      }
      // Update novel with old thumbnail
      else if (newNovel.image_path !== "" && newNovel.thumbnail !== "" && selectedFile === null) {
        pushNovel(newNovel, props.novelID)
        uploadMessage("Successfully uploaded", "success", duration);
      }
    }
  };
  
  const buttons = ["Mystery", "Thriller", "Romantic", "Adventure", "Danmei", "Sci-fi", "Horror", "Action"];
  return (
    <div className="edit-novel-page">
      {notificationHolder}
      <EditNovel  handleDrop={handleDrop}
                  preview={img.preview}
                  handleTitle={handleTitle}
                  title={title}
                  handleGenreClick={handleGenreClick}
                  buttons={buttons}
                  genre={genre}
                  handleDescription={handleDescription}
                  description={description}
                  />

      <EditChapter />
      <Button children="Submit" onClick={submitNovel}/>
    </div>
  );
};

export default EditNovelPage;
