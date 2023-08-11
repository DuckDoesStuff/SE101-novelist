import React from 'react';

const HorNovelCard = (props) => {
  const { thumbnailSrc, name, genres, author,script } = props;

  const HorNovelCardContainerStyle = {
    display: 'flex',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    borderRadius: '15px',
    margin: '10px 10px 10px 10px',
  };

  const ThumbnailStyle = {
    width: '100px',
    height: '100px',
    margin:'10px 10px 10px 10px',
  };

  const NovelInfoStyle = {
    flex: 1,
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
    color: 'var(--background-02)',
  };
  const ScriptStyle = {
    fontSize: '14px',
    color: 'var(--background-02)',
    marginTop: '10px',
  };

  return (
    <div style={HorNovelCardContainerStyle}>
      <img src={thumbnailSrc} alt="Thumbnail" style={ThumbnailStyle} />
      <div style={NovelInfoStyle}>
        <h3>{name}</h3>
        <div style={GenreContainerStyle}>
          {genres.map((genre, index) => (
            <div key={index} style={GenreStyle}>
              {genre}
            </div>
          ))}
        </div>
        <p style={AuthorStyle}>{author}</p>
        <p style={ScriptStyle}>{script}</p>
      </div>
    </div>
  );
};

export default HorNovelCard;
