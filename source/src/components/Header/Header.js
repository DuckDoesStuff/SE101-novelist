import React, { useState } from "react";
import "../../styles/styles.css";
import GenreList from '../GenreList'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMoon, faCaretDown, faSearch, faUserLarge } from '@fortawesome/free-solid-svg-icons';


function Header() {

  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false); // Giả định trạng thái chưa signin ban đầu

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchInputKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search` /*?query=${searchInput}*/); // Điều hướng đến trang SearchPage với query
    }
  };

  
  const handleSignIn = () => {
    // Xử lý khi người dùng thực hiện signin
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    // Xử lý khi người dùng thực hiện signout
    setIsSignedIn(false);
  };


  const headerStyle = {
    width: "1440px",
    height: "70px",
    background: "var(--background-01)",
    color: "var(--text)",
    display: "flex",
    //x`justifyContent: 'space-between',
    padding: "0 20px",
    alignItems: "center",
    border: "0px none",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
    marginRight: "30px",
  };
  const genreButtonBoxStyle = {
    border: "0px none",
    height: "36px",
    width: "106px",
    color: "var(--text)",
    backgroundColor: "var(--background-02)",
    fontWeight: "bold",
    borderRadius: "5px",
    marginRight: "30px",
  };

  const [showGenres, setShowGenres] = useState(false);

  const toggleGenres = () => {
    setShowGenres(!showGenres);
  };
  
  const searchInputStyle = {
    height: "36px",
    width: "460px",
    border: "0px none",
    // padding: '5px 10px',
    backgroundColor: "white",
    color: "black",
    marginRight: "20px",
    borderRadius: "5px",
    paddingLeft: "25px",
    // Thêm khoảng cách bên phải
  };
  const buttonContainer = {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    right: "10px",
  };

  const darkThemeButtonStyle = {

    border: "0px none",
    height: "36px",
    width: "36px",
    backgroundColor: "var(--background-02)",
    color: "var(--text)",
    fontWeight: "bold",
    borderRadius: "50%",
    marginRight: "20px",
    alignItems: "center",
    // position: 'absolute',
    // marginLeft: '530px'
  ":hover": {
    backgroundColor: "var(--background-hover)", // Change this to the hover background color
    color: "var(--text-hover)", // Change this to the hover text color
  },
};

  const signUpButtonBoxStyle = {

    border: "0px none",
    height: "36px",
    width: "90px",
    backgroundColor: "var(--background-02)",
    color: "var(--text)",
    fontWeight: "bold",
    borderRadius: "5%",
    marginRight: "20px",
    alignItems: "center",
    // position: 'absolute',
  };
  const signInButtonBoxStyle = {
    
    border: "0px none",
    height: "36px",
    width: "90px",
    backgroundColor: "var(--background-02)",
    color: "var(--text)",
    fontWeight: "bold",
    borderRadius: "5%",
    marginRight: "30px",
    alignItems: "center",
    // position: 'absolute',
  };
  return (
    <div style={headerStyle}>
      <div style={logoStyle}>
        <Link to="/">
          <img src="/logo.svg" alt="Logo" />
        </Link>
      </div>
      <div>
      <div><button style={genreButtonBoxStyle} onClick={toggleGenres}> Genre <FontAwesomeIcon icon={faCaretDown} /></button></div>
      {showGenres && <GenreList />}
      </div>
      <div style={{ position: "relative" }}>
        <FontAwesomeIcon
          icon={faSearch}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "5px", // Cách viền trái của input
            color: "#0B886D",
          }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          style={searchInputStyle}
          value={searchInput}
          onChange={handleSearchInputChange}
          onKeyPress={handleSearchInputKeyPress}
        />
      </div>
      <div style={buttonContainer}>
        {isSignedIn ? (
          // Hiển thị biểu tượng người dùng và nút Dark Theme khi đã signin
          <div>
            <Link to="/profile">
            <button style={darkThemeButtonStyle}>
              <FontAwesomeIcon icon={faUserLarge} flip="horizontal" size="lg" />
            </button>
            </Link>
          </div>
        ) : (
          // Hiển thị nút Sign Up và Sign In khi chưa signin
          <div>
            <Link to="/signup">
              <button style={signUpButtonBoxStyle} onClick={handleSignIn}>Sign In</button>
            </Link>
            <Link to="/signin">
              <button style={signInButtonBoxStyle} onClick={handleSignIn}>Sign In</button>
            </Link>
          </div>
        )}
         <button style={darkThemeButtonStyle}>
              <FontAwesomeIcon icon={faMoon} flip="horizontal" size="2x" />
            </button>
      </div>
    </div>
  );
}

export default Header;
