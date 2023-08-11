import React, { useState } from "react";
import styles from "../styles/NovelCard.module.css";

const NovelCard = ({ novel, onClick }) => {
  return (
    <div className={styles["novel-card"]} title={novel.title} onClick={onClick}>
      <img src={novel.thumbnail} alt={novel.title} />
      <div className={styles["tag"]}>
        <p className={styles["genre"]}> {novel.genre[0]} </p>
        <p className={styles["product-name"]}> {novel.title} </p>
      </div>
    </div>
  );
};

export default NovelCard;
