import React from "react";
import styles from "./AuthorItem.module.css";

const AuthorItem = ({author, onClick}) => {
    return (
        <div className={styles["author-item"]} onClick={onClick} title={author.username}>
            <div className={styles["ava-container"]}>
                <img src={author.ava} alt={author.name} />
            </div>
            <div className={styles["info"]}>
                    <p className={styles["author-username"]}> {author.username} </p>
                    <div className={styles["tag"]}>
                        <p className={styles["author-info"]}> {author.followers} followers </p>
                        <p className={styles["author-info"]}> {author.novels} novels </p>
                    </div>
            </div>
        </div>
    );
};

export default AuthorItem;
