import React, { useState,useEffect } from "react";
import Header from "../Header/Header.js";
import "./SettingZone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button.js";
import { updatePassword } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth";
import { auth } from "../../backend-api/FirebaseConfig";
import { message } from "antd";
import { reauthenticateWithCredential } from "firebase/auth";
import { Link } from "react-router-dom";
import { uploadImage, pushAuth,genAuthKey,emptyAuth ,getUser} from "../../backend-api/API";
import { storage } from '../../backend-api/FirebaseConfig';
import { deleteObject, ref } from "firebase/storage";




const SettingZone = (props) => {

  const [authID, setAuthID] = useState(null);

  useEffect(() => {
    if(props.AuthID !== null)
      setAuthID(props.AuthID);
    else
      setAuthID(genAuthKey());
  }, [props.AuthID])

  
  const [isProfileSelected, setProfileSelected] = useState(true);
  const [isAccountSelected, setAccountSelected] = useState(false);

  const handleProfileClick = () => {
    setProfileSelected(true);
    setAccountSelected(false);
  };

  const handleAccountClick = () => {
    setProfileSelected(false);
    setAccountSelected(true);
  };
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [messageApi, notificationHolder] = message.useMessage();

  const uploadMessage = (content, type, duration) => {
    messageApi.destroy();
    messageApi.open({
      content: content,
      type: type,
      duration: duration,
      style: {
        marginTop: "20px auto",
      },
    });
  };
  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      uploadMessage("New passwords do not match", "error", 2);
      return;
    }
    try {
      const credentials = EmailAuthProvider.credential(email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credentials);

      await updatePassword(auth.currentUser, newPassword);
      uploadMessage("Password updated successfully", "success", 2);
    } catch (error) {
      console.error("Error updating password:", error);
      uploadMessage("An error occurred while updating password", "error", 2);
    }
  };
  const [selectedFile, setSelectedFile] = useState("");
  const [Name, setName] = useState("");
  const [Bio, setBio] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [img, setImg] = useState({ preview: "" });
  const [genre, setGenre] = useState([]);
  const [chapterID, setChapterID] = useState([]);
  // const [submitAuth, setSubmitAuth] = useState(false);
  const [Loading, setLoading] = useState(true);

  // Image preview
  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => (file => URL.revokeObjectURL(file.preview));
  }, [img]);

  useEffect(() => {
    // Fetch  data from backend
    const fetchAuth = (authID) => {
      getUser(authID)
      .then((data) => {
        setName(data.Name);
        setBio(data.Bio);
        setImagePath(data.image_path);
        setThumbnail(data.thumbnail);
        setImg({preview: data.thumbnail});
        setGenre(data.genre);
        setChapterID(data.chapter_id || []);
        // console.log("chapter_id", data.chapter_id)
        // console.log("chapterID", chapterID)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
    }

    fetchAuth(authID)
  }, [authID])

  const handleDrop = (acceptedFiles) => {
    // Set the selected file first then after hitting 'Save' we will upload
    setSelectedFile(acceptedFiles[0]);

    // Set the preview image
    setImg(Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])})
    );
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleBio = (e) => {
    setBio(e.target.value);
  };

  // const [messageApi, notificationHolder] = message.useMessage();

  const submitAuth = () => {
    var message = "", type = "error", duration = 2;
    if(!Name)
      message = "You need to fill out the Name";
    else if(!Bio)
      message = "You need to fill out the Bio";
    else if(!img.preview)
      message = "You need to upload an image";
    else if(genre.length < 1)
      message = "You need to select at least one genre";
    // else if (chapterID.length === undefined || chapterID.length < 1)
    //   message = "You need to have at least one chapter";
    else {
      message = "Uploading Auth";
      type = "loading";
    }
    uploadMessage(message, type, duration);

    if(type === "loading") {
      var newAuth = emptyAuth();
      newAuth.id = authID;
      newAuth.Name = Name;
      newAuth.normalized_Name = Name.toLowerCase().replace(/ /g, "-");
      newAuth.Bio = Bio;
      newAuth.genre = genre;
      newAuth.image_path = imagePath;
      newAuth.thumbnail = thumbnail;
      newAuth.chapter_id = chapterID;

      // Completely new novel
      if(newAuth.image_path === "" && newAuth.thumbnail === "" && selectedFile !== "") {
        uploadImage(selectedFile).then((result) => {
          newAuth.thumbnail = result.downloadURL;
          setThumbnail(result.downloadURL);
          newAuth.image_path = result.filePath;
          setImagePath(result.filePath);

          pushAuth(newAuth, authID)
          uploadMessage("Successfully uploaded", "success", duration);
        });
      }
      // Update novel with new thumbnail
      else if(newAuth.image_path !== "" && newAuth.thumbnail !== "" && selectedFile !== "") {
        deleteObject(ref(storage, newAuth.image_path))
        .catch((error) => {
          console.error("Possibly the file has already been deleted", error)
        })
        uploadImage(selectedFile).then((result) => {
          newAuth.thumbnail = result.downloadURL;
          setThumbnail(result.downloadURL);
          newAuth.image_path = result.filePath;
          setImagePath(result.filePath);

          pushAuth(newAuth, authID)
          uploadMessage("Successfully uploaded", "success", duration);
        });
      }
      // Update novel with old thumbnail
      else if (newAuth.image_path !== "" && newAuth.thumbnail !== "" && selectedFile === "") {
        pushAuth(newAuth, authID)
        uploadMessage("Successfully uploaded", "success", duration);
      } else {
        uploadMessage("Successfully uploaded", "success", duration);
      }
      //   setSubmitChapter(true);
    }
  };

  // const cancelNovel = () => {
  //   deleteNovel(authID)
  //   .then(() => {
  //     uploadMessage("Successfully deleted", "success", 2);
  //   })
  //   .catch((error) => {
  //     console.error("An error occured while deleting novel: ", error, authID)
  //   })
  // }

  return (
    <div>
      <Header />
      <div className="SettingZone">
        {notificationHolder}
        <div className="SettingNav">
          <div
            className={`SettingChoice ${isProfileSelected ? "selected" : ""}`}
            onClick={handleProfileClick}
          >
            <FontAwesomeIcon icon={faUser} /> Publish Profile
          </div>
          <div
            className={`SettingChoice ${isAccountSelected ? "selected" : ""}`}
            onClick={handleAccountClick}
          >
            <FontAwesomeIcon icon={faGear} /> Account
          </div>
          {/* Thêm các mục SettingChoice khác */}
        </div>
        {isProfileSelected && (
          <div className="MainContent">
            <div className="AvaContainer">
              <img src="/image_path" className="UserAva"></img>
              <Button>Change Ava</Button>
            </div>
            <div className="Infocontainer">
              <p className="text">Display Name</p>
              <input
                className="inputFields"
                type="text"
                placeholder="Enter your name"
              />
              <p className="text">Bio</p>
              <input
                className="inputFields bio"
                type="text"
                placeholder="Enter your bio.."
              />
              <div className="btnFuncContainer">
                <button className="funcbtn" onClick={submitAuth}>Save</button>
                <button className="funcbtn cancel">Cancel</button>
              </div>
            </div>
          </div>
        )}
        {isAccountSelected && (
          <div className="MainContent Account">
            <div className="Infocontainer">
              <h1 className="text h1">Security</h1>
              <hr className="hrline" />
              <p className="text small">Email address</p>
              <input
                className="inputFields"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              <p className="text small">Current Password</p>
              <input
                className="inputFields"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter your current password"
              />
              <p className="text small">New Password</p>
              <input
                className="inputFields"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
              />
              <p className="text small">Confirm New Password</p>
              <input
                className="inputFields"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm your new password"
              />
              <div className="btnFuncContainer ser">
                <button className="funcbtn" onClick={handlePasswordChange}>
                  Save
                </button>
                <Link to="/home">
                  <button className="funcbtn cancel">Cancel</button>
                </Link>
              </div>
            </div>
            <div className="delZoneContainer">
              {" "}
              <h1 className="text h1">Delete Account</h1>
              <hr className="hrline" />
              <p className="text small">
                Once you delete your account, there is no going back. Please be
                certain!
              </p>
              <button className="funcbtn delete">Delete account</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingZone;
