  import React, { useState ,useEffect} from "react";
  import GenreList from '../GenreList/GenreList.js';
  import UserNav from "../UserNav/UserNav";
  import { Link } from "react-router-dom";
  import { useNavigate } from "react-router-dom";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import {  faMoon, faCaretDown, faSearch, faUserLarge } from '@fortawesome/free-solid-svg-icons';
  import { getAuth } from "firebase/auth";
  import { auth } from "../../backend-api/FirebaseConfig";
  import { useTheme } from '../ThemeProvider';
  import { searchNovel } from '../../backend-api/API.js';
  import { searchNovelByGenre } from "../../backend-api/API.js";
  import { getAllNovels } from "../../backend-api/API.js";
  import "./Header.css"; // Import the CSS file

  const Header = () => {
    const [showScrolledHeader, setShowScrolledHeader] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [selectedGenre, setSelectedGenre] = useState("");
    
    const handleSignIn = () => {
      setIsSignedIn(true);
    };
    const handleSignOut = () => {
      setIsSignedIn(false);
    };
    
    const checkLoginStatus = () =>{
      var temp  ;
      auth.onAuthStateChanged((user)=>{
        if(user){
          setIsSignedIn(true);
          temp = true;
        }
        else
          setIsSignedIn(false);
          temp = false;
      })
      // console.log(temp);
      return temp;
    }

    useEffect(() => {
      // setIsSignedIn(checkLoginStatus())
      console.log(checkLoginStatus()) 
    }, [])
    const [showGenres, setShowGenres] = useState(false); // Define showGenres state here
    const [showUserNav, setShowUserNav] = useState(false); // Define showGenres state here
    const [selectedGenres, setSelectedGenres] = useState([]);

    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");
    
    const handleSearch = async () => {
      if (searchInput.trim() !== '') {
        try {
          const results = await searchNovel(searchInput);
          navigate(`/search?query=${encodeURIComponent(searchInput)}`);
        } catch (error) {
          console.error('Error searching novels:', error);
        }
      }
    };
    const handleSearchByGenre = async (genre) => {
      try {
        setSelectedGenre(genre);
        navigate(`/search?genre=${encodeURIComponent(genre)}`);
      } catch (error) {
        console.error('Lỗi khi tìm kiếm theo thể loại:', error);
      }
    };
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setShowScrolledHeader(true);
        } else {
          setShowScrolledHeader(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
    const handleSearchInputChange = (event) => {
      setSearchInput(event.target.value);
    };

    const handleSearchInputKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };

    const toggleUserNav = () => {
      setShowUserNav(!showUserNav);
      setShowGenres(false);
    };

    const toggleGenres = () => {
      setShowGenres(!showGenres);
      setShowUserNav(false);
    };
    
    
  // const checkLoginStatus = () => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       var  temp = setIsSignedIn();
  //       console.log(isSignedIn)
  //     } else {
  //       console.log(isSignedIn)
  //     }
  //   })
  // }
    const { toggleTheme } = useTheme(); // Destructure the toggleTheme function
    const handleThemeToggle = () => {
      toggleTheme(); // Call the toggleTheme function
    };
    // var resultDiv = document.getElementById("resultDiv");
    // resultDiv.textContent = string(username);

    return (
      <div className={`header ${showScrolledHeader ? "scrolled" : ""}`}>
        <div className="headlogo">
            <Link to={"/"}>
                <img src="/logo.svg" alt ="logo"/>
            </Link>
        </div>
          <button 
            className={`headbtn ${showGenres?'clicked':''}` }
            onClick={toggleGenres}>Genres <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
          </button>
          {showGenres && <GenreList onClick={handleSearchByGenre}></GenreList>}
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
              <button 
                className={`headbtn ${showUserNav?'clicked':''}` }
                style={{borderRadius:'50%',width:'36px',marginRight:'10px'}} 
                onClick={() => {
                  toggleUserNav();
                }}>
                <FontAwesomeIcon icon={faUserLarge} flip="horizontal" size="lg" />
              </button>
              {showUserNav && <UserNav/>}

            </div>
          ) : (
            <div>
              <Link to="/signup">
                <button className="headbtn" >Sign Up</button>
              </Link>
              <Link to="/signin">
                <button className="headbtn" onClick={handleSignIn}>Sign In</button>
              </Link>
            </div>     
            )}
          
          <button className="headbtn themebtn" 
          onClick={handleThemeToggle}><FontAwesomeIcon 
                icon={faMoon} flip="horizontal" size="2x" />
              
          </button>
          
        </div>
        
      </div>
    );
  }

  export default Header;
