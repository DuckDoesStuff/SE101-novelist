import React, { useState, useEffect } from "react";
import EditNovel from "../components/EditNovel/EditNovel";
import EditChapter from "../components/EditChapter/EditChapter";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";

import { message } from "antd";
import { uploadImage, pushNovel, emptyNovel, getNovel, emptyChapter, pushChapter, getChapter } from "../backend-api/API";
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
  const [chapterID, setChapterID] = useState([]);
  const [chapterInfo, setChapterInfo] = useState([]);

  // Fetch novel data from backend
  const fetchNovel = (novelID) => {
    getNovel(novelID)
    .then((data) => {
      setTitle(data.title);
      setDescription(data.description);
      setImagePath(data.image_path);
      setThumbnail(data.thumbnail);
      setImg({preview: data.thumbnail});
      setGenre(data.genre);
      setChapterID(data.chapter_id);
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

  // Image preview
  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => (file => URL.revokeObjectURL(file.preview));
  }, [img]);

  // Fetch chapter data based on chapter IDs
  const fetchChapters = () => {
    for(var i = 0; i < chapterID.length; i++) {
      getChapter(chapterID[i])
      .then((data) => {
        chapterInfo.push(data);
      })
    }
  };

  // Use useEffect to trigger fetchChapters after chapter state updates
  useEffect(() => {
    fetchChapters();
  }, [chapterID]);

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
    else if (chapterID.length < 1)
      message = "You need to have at least one chapter";
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
      newNovel.chapter_id = chapterID;

      // Completely new novel
      if(newNovel.image_path === "" && newNovel.thumbnail === "" && selectedFile !== "") {
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
      else if(newNovel.image_path !== "" && newNovel.thumbnail !== "" && selectedFile !== "") {
        deleteObject(ref(storage, newNovel.image_path))
        .catch((error) => {
          console.error("Possibly the file has already been deleted", error)
        })
        uploadImage(selectedFile).then((result) => {
          newNovel.thumbnail = result.downloadURL;
          setThumbnail(result.downloadURL);
          newNovel.image_path = result.filePath;
          setImagePath(result.filePath);

          pushNovel(newNovel, props.novelID)
          uploadMessage("Successfully uploaded", "success", duration);
        });
      }
      // Update novel with old thumbnail
      else if (newNovel.image_path !== "" && newNovel.thumbnail !== "" && selectedFile === "") {
        pushNovel(newNovel, props.novelID)
        uploadMessage("Successfully uploaded", "success", duration);
      } else {
        uploadMessage("Successfully uploaded", "success", duration);
      }
    }
  };

  const handlePushChapter = () => {
    var newChapter = emptyChapter();
    newChapter.title = "Untitled";
    newChapter.novel_id = props.novelID;
    newChapter.content = "";
    newChapter.like = 0;
    newChapter.view = 0;
    setChapterInfo([...chapterInfo, newChapter]);
  }

  const testFunction = () => {
    console.log(chapterInfo)
  }
  const buttons = ["Mystery", "Thriller", "Romantic", "Adventure", "Danmei", "Sci-fi", "Horror", "Action"];
  return (
    <div className="edit-novel-page">
      {notificationHolder}
      <Header />

      <div className="button-group">
        <Button children="Submit" onClick={submitNovel}/>
        <Button children="Cancel" onClick={submitNovel}/>
        <Button children="Test" onClick={testFunction}/>
      </div>

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

      <Button children="New chapter" onClick={handlePushChapter}/>
      <EditChapter chapterInfo={chapterInfo} saveChapterInfo={setChapterInfo} />
    </div>
  );
};

export default EditNovelPage;
