import React, { useState } from "react";
import styles from "../styles/NovelCard.module.css";

const NovelCard = ({ novel, onClick }) => {
  return (
    <div className={styles["novel-card"]} title={novel.title} onClick={onClick}>
      <img src={novel.thumbnail} alt={novel.title} />
      <div className={styles["tag"]}>
        <p className={styles["genre"]}> {novel.genre[0]} </p>
        <div className={styles["info"]}>
          <p className={styles["novel-name"]}> {novel.title} </p>
          <p className={styles["author"]}> {novel.author} </p>
        </div>
      </div>
    </div>
  );
};

export default NovelCard;
