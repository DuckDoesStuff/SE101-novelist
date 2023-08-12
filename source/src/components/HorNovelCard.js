import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const HorNovelCard = (props) => {
  const { thumbnailSrc, name, genres, author,likes,script } = props;

  const HorNovelCardContainerStyle = {
    display: 'flex',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '22px',
    margin: '10px 10px 10px 10px',
    width : '1103px',
    height: '269px',
  
  };

  const ThumbnailStyle = {
    objectFit: 'cover',
    margin: '30px 30px 30px 30px',
    borderRadius: '17px',
    width : '165px',
    height: ' 208px',
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
    <div style={HorNovelCardContainerStyle}>
      <Link to ="/novelinfo">
        <img src={thumbnailSrc} alt="Thumbnail" style={ThumbnailStyle} />
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
