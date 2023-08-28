import React from "react";
import AuthorItem from "../AuthorItem/AuthorItem.js";
import styles from "./TopNovel.module.css";
import { Link } from "react-router-dom";

const TopAuthor = ({ author }) => {
    return (
        <div className={styles["container"]}>
            <h2 className={styles["title"]}> Top author </h2>
            <div className={styles["list"]}>
                {author.map((author) => (
                    <div key={author.id}>
                        <AuthorItem author={author} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopAuthor;
