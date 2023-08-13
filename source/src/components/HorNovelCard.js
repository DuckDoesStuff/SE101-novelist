import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faPlay } from '@fortawesome/free-solid-svg-icons';





const HorNovelCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { thumbnailSrc, name, genres, author,likes,script } = props;

  const HorNovelCardContainerStyle = {
    
    display: 'flex',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '22px',
    margin: '10px 10px 10px 10px',
    width : '1103px',
    height: '269px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',//đổ bóng
  
  };

  const ThumbnailStyle = {
    filter: isHovered ? 'brightness(40%)' : 'none',
    objectFit: 'cover',
    margin: '30px 30px 30px 30px',
    borderRadius: '17px',
    width : '165px',
    height: ' 208px',
    position: 'relative',
    transition: 'background-color 0.3s', 
  };
  const thumbIconStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    fontSize: '30px',
    color: "white"
    // ...các thuộc tính khác của biểu tượng
  };
  const ContentContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'space-between',
    padding: '30px 10px 30px 10px',
  };

  const NovelNameStyle = {
    flex: 1,
    fontSize: '30px',
    marginBottom: '10px'
  };

  const GenreContainerStyle = {
    display: 'flex',
    marginBottom: '5px',
  };

  const GenreStyle = {
    backgroundColor: 'var(--background-02)',
    fontSize: '14px',
    color: 'var(--text)',
    fontWeight: 'bold',
    borderRadius: '5px',
    padding: '2px 8px',
    marginRight: '5px',
  };

  const AuthorStyle = {
    fontSize: '14px',
    color: 'var(--background-01)',
    fontWeight: 'bold',   
    marginTop: '10px',
  };
  const LikesStyle = {
    fontSize: '14px',
    color: 'var(--background-01)',
    fontWeight: 'bold', 
    marginLeft: '100px', // Khoảng cách bên phải
  };
  const ScriptStyle = {
    fontSize: '14px',
    color: 'var(--background-02)',
    marginTop: '10px',
  };

  return (
    <div   style={{
      ...HorNovelCardContainerStyle,
      backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.1)' : 'transparent', // Đổi màu nền khi hover
    }}
  >
     <Link to="/novelinfo">
      <div style={{ position: 'relative' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <img
          src={thumbnailSrc}
          alt="Thumbnail"
          style={ThumbnailStyle}
        />
        {isHovered && (
          <FontAwesomeIcon icon={faPlay} style={thumbIconStyle} />
        )}
      </div>
    </Link>
        <div style={ContentContainerStyle}>
          <div>
            <div>
              <Link to ="/novelinfo">
                <h1 style={NovelNameStyle}>{name.toUpperCase()}</h1>
              </Link> 
            </div>
            <div style={GenreContainerStyle}>
              {genres.map((genre, index) => (
                <div key={index} style={GenreStyle}> {genre}
                </div>
              ))}
            </div>
          </div>
        <div>
          <p style={AuthorStyle}>Author: <Link to ="/profile">{author}</Link>
            <span style={LikesStyle}>Likes: {likes} <FontAwesomeIcon icon={faHeart} />
            </span>
          </p>
          <p style={ScriptStyle}>{script}</p>
        </div>
      </div>
    </div>
  );
};

export default HorNovelCard;
