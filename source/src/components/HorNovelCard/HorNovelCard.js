import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {getUser} from "../../backend-api/API.js"
import "./HorNovelCard.css";

const HorNovelCard = (props) => {
    const [isHovered, setIsHovered] = useState(false);
    const { novel, thumbnailSrc, name, genres, author, likes, script } = props;
    const [authorName,setAuthorName] = useState("");
    useEffect(() => {
        // Fetch  data from backend
        const fetchAuth = () => {
        getUser(author).then((data) => {
          setAuthorName(data.name);
            //setImagePath(data.image_path);
            // console.log("chapter_id", data.chapter_id)
            // console.log("chapterID", chapterID)

          });
        
    
        fetchAuth();}
      }, []);
    
    return (
        <div className={`HorNovelCardContainer ${isHovered ? "Hovered" : ""}`}>
            <Link to={`/novel/${novel.id}`}>
                <div
                    className="ThumbnailContainer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img
                        src={thumbnailSrc}
                        className="ThumbImg"
                        alt="thumbnail"
                    />
                </div>
            </Link>
            <div className="HorContentContainer">
                <Link to={`/novel/${novel.id}`}>
                    <h1 className="NovelTitle">{name}</h1>
                </Link>
                <div className="GenresContainer">
                    {genres.map((genre, index) => (
                        <button className="GenreBtn" key={index} title="genre">
                            {genre}
                        </button>

                    ))}
                </div>
                <Link to="/profile" className="AuthorName">
                    Author: {authorName}
                </Link>
                <span className="Likes">
                    Likes: {likes}{" "}
                    <FontAwesomeIcon
                        icon={faHeart}
                        style={{ color: "var(--background-01)" }}
                    />
                </span>
                <p className="Script">{script}</p>
            </div>
        </div>
    );
};

export default HorNovelCard;
