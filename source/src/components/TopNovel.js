import React from "react";
import NovelItem from "./NovelItem.js";
import styles from "../styles/TopNovel.module.css";

const TopNovel = ({ novel, onClick }) => {
    return (
        <div className={styles["container"]}>
            <h2 className={styles["title"]}> Top novel </h2>
            <div className={styles["list"]}>
                {novel.map((novel) => (
                    <div key={novel.id}>
                        <NovelItem
                            novel={novel}
                            onClick={() => onClick(novel)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopNovel;
