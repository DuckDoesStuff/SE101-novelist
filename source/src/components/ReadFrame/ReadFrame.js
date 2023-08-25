import React from "react";
import styles from "./ReadFrame.module.css";
const ReadFrame = ({ novel, chapter }) => {
    return (
        <div className={styles["frame"]}>
            <div className={styles["novel-info"]}>
                <p className={styles["title"]}> {novel.title} </p>
                <p className={styles["chapter"]}> {chapter.chapterTitle}</p>
                <div>
                    <div className={styles["reaction"]}>
                        <i className="fa-solid fa-heart"></i> <p> {novel.like} </p>
                        <i className="fa-solid fa-comment"></i> <p> {novel.comment} </p>
                    </div>
                </div>
            </div>
            <div className={styles["content"]}>
                {chapter.chapterContent}
            </div>
        </div>
    );
};

export default ReadFrame;
