import React, { useState } from "react";
import GenreList from '../GenreList';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMoon, faCaretDown, faSearch, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from "firebase/auth";
import { auth } from "../../backend-api/FirebaseConfig";

import "./Header.css"; // Import the CSS file

function Header() {
  const [showGenres, setShowGenres] = useState(false); // Define showGenres state here
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchInputKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search`);
    }
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  const toggleGenres = () => {
    setShowGenres(!showGenres);
  };

  // const storedUser = JSON.parse(sessionStorage.getItem("user"));
  // // const auth = getAuth();
  // // const user = auth.currentUser;
  // // console.log(user.email);
  // console.log(isSignedIn)
  // if (storedUser!==null){
  //     // const username = user.displayName;
  //     const temp = handleSignIn;
  //     // console.log(user.email);
  // }
  

  const checkLoginStatus = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        var  temp = setIsSignedIn();
        console.log(isSignedIn)
      } else {
        console.log(isSignedIn)
      }
    })
  }


  // var resultDiv = document.getElementById("resultDiv");
  // resultDiv.textContent = string(username);

  return (
    <div className="header">
      <div className="headlogo">
      {checkLoginStatus}
          <Link to={"/"}>
              <img   src="/logo.svg" alt ="logo"/>
          </Link>
      </div>
        <button 
          className={`headbtn ${showGenres?'clicked':''}` }
          onClick={toggleGenres}>Genres <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
        </button>
        {showGenres && <GenreList />}
      <div style={{ position: "relative" }}>
          <FontAwesomeIcon
          icon={faSearch}
          className="searchIcon"
          />
          <input
            type="text"
            placeholder="Search..."
            className="searchInput"
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyPress={handleSearchInputKeyPress}
          />
      </div>
      <div className="btnContainer">
        {isSignedIn ? (
          <div>
            <Link to="/profile">
                <button className="headbtn">
                  <FontAwesomeIcon icon={faUserLarge} flip="horizontal" size="lg" />
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/signup">
              <button className="headbtn" onClick={handleSignIn}>Sign Up</button>
            </Link>
            <Link to="/signin">
              <button className="headbtn" onClick={handleSignIn}>Sign In</button>
            </Link>
          </div>     
          )}
        
        <button className="headbtn themebtn">
            <FontAwesomeIcon icon={faMoon} flip="horizontal" size="2x" />
        </button>
        
      </div>
      
    </div>
  );
}

export default Header;
