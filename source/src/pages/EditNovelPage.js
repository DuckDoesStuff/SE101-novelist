import React, { useState, useEffect } from "react";
import EditNovel from "../components/EditNovel/EditNovel";
import EditChapter from "../components/EditChapter/EditChapter";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";

import { message } from "antd";
import { uploadImage, pushNovel, emptyNovel, getNovel, genNovelKey, deleteNovel } from "../backend-api/API";
import { auth, fstore, storage } from '../backend-api/FirebaseConfig';
import { deleteObject, ref } from "firebase/storage";
import { useParams } from "react-router-dom";
// import { auth } from "../backend-api/FirebaseConfig";
import { Auth, getAuth } from "firebase/auth";
import "../styles/EditNovelPage.css";
import { arrayUnion, doc, updateDoc } from "@firebase/firestore";

const EditNovelPage = (props) => {
  const { id: urlID } = useParams();
  const [novelID, setNovelID] = useState(urlID || genNovelKey())
  useEffect(() => {
    if(!urlID){
      setNovelID(genNovelKey())
    }
  }, [urlID])

  // useEffect(() => {
  //   if(props.novelID !== undefined)
  //     setNovelID(props.novelID);
  //   else
  //     setNovelID(genNovelKey());
  // }, [props.novelID])

  const [selectedFile, setSelectedFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [img, setImg] = useState({ preview: "" });
  const [genre, setGenre] = useState([]);
  const [chapterID, setChapterID] = useState([]);
  const [submitChapter, setSubmitChapter] = useState(false);
  const [loading, setLoading] = useState(true);


  // Image preview
  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => (file => URL.revokeObjectURL(file.preview));
  }, [img]);

  useEffect(() => {
    // Fetch novel data from backend
    const fetchNovel = async (novelID) => {
      await getNovel(novelID)
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setImagePath(data.image_path);
        setThumbnail(data.thumbnail);
        setImg({preview: data.thumbnail});
        setGenre(data.genre);
        setChapterID(data.chapter_id || []);
        
        // console.log("chapter_id", data.chapter_id)
        // console.log("chapterID", chapterID)
      })
    }

    fetchNovel(novelID)
    .then(() => {
      setLoading(false);
    })
  }, [])

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
    // else if (chapterID.length === undefined || chapterID.length < 1)
    //   message = "You need to have at least one chapter";
    else {
      message = "Uploading novel";
      type = "loading";
    }
    uploadMessage(message, type, duration);

    if(type === "loading") {
      var newNovel = emptyNovel();
      newNovel.id = novelID;
      newNovel.title = title;
      newNovel.normalized_title = title.toLowerCase().replace(/ /g, "-");
      newNovel.description = description;
      newNovel.genre = genre;
      newNovel.image_path = imagePath;
      newNovel.thumbnail = thumbnail;
      newNovel.chapter_id = chapterID;
      newNovel.author_id = auth.currentUser.uid;

      // Completely new novel
      if(newNovel.image_path === "" && newNovel.thumbnail === "" && selectedFile !== "") {
        uploadImage(selectedFile).then((result) => {
          newNovel.thumbnail = result.downloadURL;
          setThumbnail(result.downloadURL);
          newNovel.image_path = result.filePath;
          setImagePath(result.filePath);

          pushNovel(newNovel, novelID)
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

          pushNovel(newNovel, novelID)
          uploadMessage("Successfully uploaded", "success", duration);
        });
      }
      // Update novel with old thumbnail
      else if (newNovel.image_path !== "" && newNovel.thumbnail !== "" && selectedFile === "") {
        pushNovel(newNovel, novelID)
        uploadMessage("Successfully uploaded", "success", duration);
      } else {
        uploadMessage("Successfully uploaded", "success", duration);
      }
      //update novelid into published list of user
      updateDoc(doc(fstore, "userinfos", auth.currentUser.uid), {
        published: arrayUnion(novelID)
      })
      setSubmitChapter(true);
    }
  };

  const cancelNovel = () => {
    deleteNovel(novelID)
    .then(() => {
      uploadMessage("Successfully deleted", "success", 2);
    })
    .catch((error) => {
      console.error("An error occured while deleting novel: ", error, novelID)
    })
  }

  const testFunction = () => {
    console.log(chapterID, "chapterID editnovel");
    console.log(novelID, "noveID editnovel");
    // setSubmitChapter(true);
  }

  if(loading) {
    return (
      <div>
        <Header />
        <img src="/loading.svg" className="loading"/>
      </div>
    )
  }

  const buttons = ["Mystery", "Thriller", "Romantic", "Adventure", "Danmei", "Sci-fi", "Horror", "Action"];
  return (
    <div className="edit-novel-page">
      <Header />
      {notificationHolder}

      <div className="button-group">
        <Button children="Submit" onClick={submitNovel}/>
        <Button children="Cancel" onClick={cancelNovel}/>
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

      <EditChapter  loading={loading} 
                    submitChapter={submitChapter} 
                    setChapterID={setChapterID} 
                    novelID={novelID} 
                    chapterID={chapterID}/>
    </div>
  );
};

export default EditNovelPage;
