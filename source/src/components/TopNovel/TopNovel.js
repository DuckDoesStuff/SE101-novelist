import React from "react";
import NovelItem from "../NovelItem/NovelItem.js";
import styles from "./TopNovel.module.css";

const TopNovel = ({ novel }) => {
    return (
        <div className={styles["container"]}>
            <h2 className={styles["title"]}> Top novel </h2>
            <div className={styles["list"]}>
                {novel.map((novel) => (
                    <div key={novel.id}>
                        <NovelItem
                            novel={novel}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopNovel;
