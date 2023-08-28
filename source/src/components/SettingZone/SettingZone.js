import React, { useState, useEffect } from "react";
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
import { getUser, emptyAuth, uploadImage, pushAuth } from "../../backend-api/API";

const SettingZone = () => {
  const [isProfileSelected, setProfileSelected] = useState(true);
  const [isAccountSelected, setAccountSelected] = useState(false);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [messageApi, notificationHolder] = message.useMessage();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [Name, setName] = useState("");
  const [Bio, setBio] = useState("");
  const [Ava,setAva] = useState("");
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [Loading, setLoading] = useState(true);

  const handleProfileClick = () => {
    setProfileSelected(true);
    setAccountSelected(false);
  };

  const handleAccountClick = () => {
    setProfileSelected(false);
    setAccountSelected(true);
  };

  // const [messageApi, notificationHolder] = message.useMessage();

  // const cancelNovel = () => {
  //   deleteNovel(authID)
  //   .then(() => {
  //     uploadMessage("Successfully deleted", "success", 2);
  //   })
  //   .catch((error) => {
  //     console.error("An error occured while deleting novel: ", error, authID)
  //   })
  // }

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
  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedAvatar(selectedFile);
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
  //const [selectedFile, setSelectedFile] = useState("");


  // const [submitAuth, setSubmitAuth] = useState(false);

  // Image preview
  // useEffect(() => {
  //   // Revoke the data uris to avoid memory leaks
  //   return () => (file => URL.revokeObjectURL(file.preview));
  // }, [img]);

  useEffect(() => {
    if(auth.currentUser){
    // Fetch  data from backend
    const fetchAuth = () => {
      getUser(auth.currentUser.uid).then((data) => {
        setName(data.name);
        setBio(data.bio);
        setAva(data.ava);
        //setImagePath(data.image_path);
        // console.log("chapter_id", data.chapter_id)
        // console.log("chapterID", chapterID)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    };

    fetchAuth();}
  }, []);

  // const handleDrop = (acceptedFiles) => {
  //   // Set the selected file first then after hitting 'Save' we will upload
  //   setSelectedFile(acceptedFiles[0]);

  //   // Set the preview image
  //   setImg(Object.assign(acceptedFiles[0], {preview: URL.createObjectURL(acceptedFiles[0])})
  //   );
  // };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleBio = (e) => {
    setBio(e.target.value);
  };

  // const [messageApi, notificationHolder] = message.useMessage();

  const submitAuth = () => {
    var message = "",
      type = "error",
      duration = 2;
    if (!newName) message = "You need to fill out the Name";
    else if (!newBio) message = "You need to fill out the Bio";
    // else if(!img.preview)
    //   message = "You need to upload an image";
    else {
      message = "Uploading Auth";
      type = "loading";
    }
    uploadMessage(message, type, duration);

    if (type === "loading") {
      var newAuth = emptyAuth();
      newAuth.id = auth.currentUser.uid;
      newAuth.name = newName;
      //   newAuth.normalized_Name = Name;
      newAuth.bio = newBio;
      if(selectedAvatar){
      uploadImage(selectedAvatar).then((result)=>{
        newAuth.ava = result.downloadURL;
        newAuth.image_path= result.filePath;
        pushAuth(newAuth, auth.currentUser.uid);
      });}
      else{
        pushAuth(newAuth, auth.currentUser.uid);

      }
      uploadMessage("Successfully uploaded", "success", duration);
    }
      // // Completely new novel
      // if (newAuth.image_path === "" /* && selectedFile !== ""*/) {
      //   pushAuth(newAuth, auth.currentUser.uid);
      //   uploadMessage("Successfully uploaded", "success", duration);
      // }
      // // Update novel with new thumbnail
      // else if (newAuth.image_path !== "" && selectedAvatar !== "") {
      //   deleteObject(ref(storage, newAuth.image_path)).catch((error) => {
      //     console.error("Possibly the file has already been deleted", error);
      //   });
      //   uploadImage(selectedAvatar).then((result) => {
      //     // newAuth.thumbnail = result.downloadURL;
      //     // setThumbnail(result.downloadURL);
      //     // newAuth.image_path = result.filePath;
      //     // setImagePath(result.filePath);

      //     pushAuth(newAuth, auth.currentUser.uid);

          
      
      // Update novel with old thumbnail
      // else if (newAuth.image_path !== "" && selectedAvatar === "") {
      //   pushAuth(newAuth, auth.currentUser.uid);
      //   uploadMessage("Successfully uploaded", "success", duration);
      // } else {
      //   uploadMessage("Successfully uploaded", "success", duration);
      // }
      //   setSubmitChapter(true);
    
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
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleBioChange = (event) => {
    setNewBio(event.target.value);
  }; 

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
            <img
          src={selectedAvatar ? URL.createObjectURL(selectedAvatar) : Ava}
          alt="Avatar"
          className="UserAva"
        />
              <label htmlFor="avatarInput" className="button">
                Change Avatar
              </label>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </div>
            <div className="Infocontainer">
              <p className="text">Display Name</p>
              <input
                className="inputFields"
                type="text"
                placeholder={Name}
                value={newName}
                onChange={handleNameChange}
              />
              <p className="text">Bio</p>
              <input
                className="inputFields bio"
                type="text"
                placeholder={Bio}
                onChange={handleBioChange}
              />
              <div className="btnFuncContainer">
                <button className="funcbtn" onClick={submitAuth}>
                  Save
                </button>
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
