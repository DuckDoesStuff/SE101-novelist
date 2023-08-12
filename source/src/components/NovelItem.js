import React from "react";
import styles from "../styles/NovelItem.module.css";

const NovelItem = ({ novel, onClick }) => {
    return (
        <div className={styles["novel-item"]} onClick={onClick}>
            <div className={styles["thumbnail-container"]}>
                <img src={novel.thumbnail} alt={novel.title} />
            </div>
            <div className={styles["info"]}>
                <p className={styles["title"]} title={novel.title}> {novel.title} </p>
                <div className={styles["tag"]}>
                    <p className={styles["genre"]}> {novel.genre[0]} </p>
                    <p className={styles["genre"]}> {novel.genre[1]} </p>
                </div>
                <p className={styles["author"]}> {novel.author} </p>
            </div>
        </div>
    );
};

export default NovelItem;
