import React from "react";
import "./GenreList.css"; // Import the corresponding CSS file

const GenreList = (onClick) => {
  const genres = ["Action", "Adventure", "Mystery", "Horror", "Thriller", "Detective", "Slice of life", "School"];
  return (
    <div className="genreListContainerStyle">
      <button className="genreListStyle" onClick={() => onClick(genres[0])}>Action</button>
      <button className="genreListStyle" onClick={() => onClick("Adventure")}>Adventure</button>
      <button className="genreListStyle">Mystery</button>
      <button className="genreListStyle">Horror</button>
      <button className="genreListStyle">Thriller</button>
    </div>
  );
};

export default GenreList
