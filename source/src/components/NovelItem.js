import React from "react";
import styles from "../styles/NovelItem.module.css";

const NovelItem = ({ novel, onClick }) => {
    const initGenre = (novel) => {
        if (novel.genre.length > 1) {
            return false;
        } else {
            return true;
        }
    };
    return (
        <div
            className={styles["novel-item"]}
            onClick={onClick}
            title={novel.title}
        >
            <div className={styles["thumbnail-container"]}>
                <img src={novel.thumbnail} alt={novel.title} />
            </div>
            <div className={styles["info"]}>
                <p className={styles["title"]} title={novel.title}>
                    {" "}
                    {novel.title}{" "}
                </p>
                {initGenre(novel) ? (
                    <div className={styles["tag"]}>
                        <p className={styles["genre"]}> {novel.genre[0]} </p>
                    </div>
                ) : (
                    <div className={styles["tag"]}>
                        <p className={styles["genre"]}> {novel.genre[0]} </p>
                        <p className={styles["genre"]}> {novel.genre[1]} </p>
                    </div>
                )}
                <p className={styles["author"]}> {novel.author} </p>
            </div>
        </div>
    );
};

export default NovelItem;
