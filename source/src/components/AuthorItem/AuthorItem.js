import React from "react";
import styles from "./AuthorItem.module.css";
import { Link } from "react-router-dom";

const AuthorItem = ({author}) => {
    return (
        <Link to={`/profile/${author.id}`}>
            <div className={styles["author-item"]} title={author.name}>
                <div className={styles["ava-container"]}>
                    <img src={author.ava} alt={author.name} />
                </div>
                <div className={styles["info"]}>
                        <p className={styles["author-username"]}> {author.name} </p>
                        <div className={styles["tag"]}>
                            <p className={styles["author-info"]}> {author.followers} followers </p>
                            <p className={styles["author-info"]}> {author.novels} novels </p>
                        </div>
                </div>
            </div>
        </Link>
    );
};

export default AuthorItem;
