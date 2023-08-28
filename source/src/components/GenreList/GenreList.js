import React from "react";
import "./GenreList.css"; // Import the corresponding CSS file

const GenreList = (onClick) => {
  return (
    <div className="genreListContainerStyle">
      <button className="genreListStyle" onClick={() => onClick("Action")}>Action</button>
      <button className="genreListStyle">Adventure</button>
      <button className="genreListStyle">Mystery</button>
      <button className="genreListStyle">Horror</button>
      <button className="genreListStyle">Thriller</button>
      <button className="genreListStyle">Detective</button>
      <button className="genreListStyle">Slice of life</button>
      <button className="genreListStyle">School</button>
    </div>
  );
};

export default GenreList
