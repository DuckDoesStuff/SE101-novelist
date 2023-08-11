import React, { useState } from 'react';
import '../../styles/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';


function Header() {
  const headerStyle = {
    width: '1440px',
    height: '70px',
    background: 'var(--background-01)',
    color: 'var(--text)',
    display: 'flex',
    //x`justifyContent: 'space-between',
    padding: '0 20px',
    alignItems: 'center',
    border: '0px none',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '30px', 
  };
  const genreButtonBoxStyle = {
    border: '0px none',
    height: '36px',
    width: '106px',
    color: 'var(--text)',
    backgroundColor: 'var(--background-02)',
    fontWeight: 'bold',
    borderRadius: '5px',
    marginRight: '30px', 
  };

  const [showGenres, setShowGenres] = useState(false);

  const toggleGenres = () => {
    setShowGenres(!showGenres);
  };

  const genreListContainerStyle = {
      position: 'absolute',
      top: '70px', // Đặt ở dưới nút "Genre"
      left: '150px',
      width: '200px', // Đặt chiều rộng cho khung chứa
      backgroundColor: 'var(--background-02)', // Màu nền
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Hiệu ứng bóng đổ
      padding: '10px', // Khoảng cách viền nội dung
  };

  const genreListStyle = {
    border: '0px none',
    height: '36px',
    width: '100%', // Để nút dài hết chiều rộng của container
    backgroundColor: 'var(--background-01)',
    color: 'var(--text)',
    fontWeight: 'bold',
    borderRadius: '5%',
    marginBottom: '10px', // Thêm khoảng cách dưới nút
  };
  const searchInputStyle = {
    height: '36px',
    width: '460px',
    border: '0px none',
  // padding: '5px 10px',
    backgroundColor: 'white',
    color: 'black',
    marginRight: '20px',
    borderRadius: '5px',
    paddingLeft: '25px'
     // Thêm khoảng cách bên phải
  };
  const buttonContainer={
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right : '10px'
  }
  const darkThemeButtonStyle = {
    border: '0px none',
    height: '36px',
    width: '36px',
    backgroundColor: 'var(--background-02)',
    color:'var(--text)',
    fontWeight: 'bold',
    borderRadius: '50%',
    marginRight: '20px', 
    alignItems : 'center',
   // position: 'absolute',
   // marginLeft: '530px'
  };

  const signUpButtonBoxStyle = {
    border: '0px none',
    height: '36px',
    width: '90px',
    backgroundColor: 'var(--background-02)',
    color: 'var(--text)',
    fontWeight: 'bold',
    borderRadius: '5%',
    marginRight: '20px', 
    alignItems : 'center',
   // position: 'absolute',

  }
  const signInButtonBoxStyle = {

    border: '0px none',
    height: '36px',
    width: '90px',
    backgroundColor: 'var(--background-02)',
    color: 'var(--text)',
    fontWeight: 'bold',
    borderRadius: '5%',
    marginRight: '30px', 
    alignItems : 'center',
   // position: 'absolute',

  }
  return (
    <div style={headerStyle}>
      <div style={logoStyle}>
        <img src="/logo.svg" alt="Logo" />
        </div>
      <div><button style={genreButtonBoxStyle} onClick={toggleGenres}> Genre <FontAwesomeIcon icon={faCaretDown} /></button></div>
      <div style={{ position: 'relative' }}>
      <FontAwesomeIcon
        icon={faSearch}
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: '5px', // Cách viền trái của input
          color: '#0B886D',
        }}
      /><input type="text"
      placeholder="Search..."
      style={searchInputStyle} /></div>
       {showGenres && (
        <div style={genreListContainerStyle}>
        <button style={genreListStyle}>Action</button>
        <button style={genreListStyle}>Comedy</button>
        <button style={genreListStyle}>Romance</button>
        <button style={genreListStyle}>Horror</button>
        <button style={genreListStyle}>Thriller</button>
        <button style={genreListStyle}>Detective</button>
        <button style={genreListStyle}>Slice of life</button>
        <button style={genreListStyle}>School</button>

        </div>)}
        <div style={buttonContainer}>
          <button style = {signUpButtonBoxStyle}>Sign Up</button>
          <button style = {signInButtonBoxStyle}>Sign In</button >
          <button style={darkThemeButtonStyle}><FontAwesomeIcon icon={faMoon} flip="horizontal" size ="2xl" /></button>
        </div>
    </div>
  );
}

export default Header;
