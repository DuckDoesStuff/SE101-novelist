import React from "react";
import AuthorItem from "./AuthorItem.js";
import styles from "../styles/TopNovel.module.css";

const TopAuthor = ({ author, onClick }) => {
    return (
        <div className={styles["container"]}>
            <h2 className={styles["title"]}> Top author </h2>
            <div className={styles["list"]}>
                {author.map((author) => (
                    <div key={author.id}>
                        <AuthorItem
                            author={author}
                            onClick={() => onClick(author)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopAuthor;
