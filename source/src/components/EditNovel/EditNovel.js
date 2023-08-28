import React from "react";
import NovelDropImage from "../NovelDropImage/NovelDropImage";
import Button from "../Button/Button";
import "./EditNovel.css";

const EditNovel = (props) => {
  return (
    <div className="edit-novel">
      <div className="edit-novel-image">
        <NovelDropImage onDrop={props.handleDrop} className="novel-drop-image" img={props.preview} />
      </div>

      <div className="edit-novel-input">
        <div>
        <p className="edit-novel-text">Novel title</p>
        <input
          type="text"
          className="input-box"
          style={{ fontSize: "17px" }}
          maxLength={60}
          onChange={props.handleTitle}
          value={props.title}
        />
        </div>

        <div>
        <p className="edit-novel-text">Genre</p>
          <div className="genre-list">
            {props.buttons.map((buttonName) => (
              <Button id={buttonName} 
                      children={buttonName} 
                      onClick={() => props.handleGenreClick(buttonName)}
                      toggled={props.genre.includes(buttonName)}
                      key={buttonName}/>
            ))}
          </div>
        </div>
        
        <div>
        <p className="edit-novel-text">Description</p>
        <textarea
          type="text"
          className="input-box"
          style={{ height: "200px" }}
          maxLength={500}
          onChange={props.handleDescription}
          value={props.description}
        />
        </div>

      </div>
    </div>
  );
};

export default EditNovel;
