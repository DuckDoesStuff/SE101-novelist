import React, { useState } from "react";
import Header from "../Header/Header.js";
import "./SettingZone.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button.js";

const SettingZone = () => {
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

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      uploadMessage("New passwords do not match", "error", 2);
      return;
    }
    try {
      const credentials = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credentials);
  
      await updatePassword(auth.currentUser, newPassword);
      uploadMessage("Password updated successfully", "success", 2);
    } catch (error) {
      console.error("Error updating password:", error);
      uploadMessage("An error occurred while updating password", "error", 2);
    }
  };

  return (
    <div>
      <Header />
      <div className="SettingZone">
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
              <img src="/image.jpg" className="UserAva"></img>
              <Button>Change Ava</Button>
            </div>
            <div className="Infocontainer">
              <p className="text">Display Name</p>
              <input
                className="inputField"
                type="text"
                placeholder="Enter your name"
              />
              <p className="text">Bio</p>
              <input
                className="inputField bio"
                type="text"
                placeholder="Enter your bio.."
              />
              <div className="btnFuncContainer">
                <button className="funcbtn">Save</button>
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
                className="inputField"
                type="text"
                placeholder="Enter your email"
              />
              <p className="text small">Current Password</p>
              <input
                className="inputField"
                type="password"
                placeholder="Enter your current password"
              />
              <p className="text small">New Password</p>
              <input
                className="inputField"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
              />
              <p className="text small">Confirm New Password</p>
              <input
                className="inputField"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm your new password"
              />
              <div className="btnFuncContainer ser">
                <button className="funcbtn">Save</button>
                <button className="funcbtn cancel">Cancel</button>
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
        {/* Thêm nội dung cho các trường hợp khác */}
      </div>
    </div>
  );
};

export default SettingZone;
