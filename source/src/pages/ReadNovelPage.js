import React, { useRef, useState } from "react";
import Header from "../components/Header/Header";
import styles from "../styles/ReadNovelPage.module.css";
import TopAuthor from "../components/TopAuthor/TopAuthor";
import TopNovel from "../components/TopNovel/TopNovel";
import ReadFrame from "../components/ReadFrame/ReadFrame";
import CommentForm from "../components/Comment/CommentForm";

const ReadNovelPage = ({ chapter, novels, authors, changeTheme }) => {
    const novel = novels.find((novel) => novel.id === chapter.novelId);
    const author = authors.find((author) => author.id === novel.author);
    const contentRef = useRef(null);
    const sideBarRef = useRef(null);
    const clickAuthor = (author) => {
        console.log(author.id);
    };
    const clickNovel = (novel) => {
        console.log(novel.id);
    };
    const [comments, setComments] = useState([]);

    const handleCommentSubmit = (newComment) => {
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
    };

    const [showChapters, setShowChapters] = useState(false);

    const toggleChapters = () => {
        setShowChapters(!showChapters);
    };

    const chaptersOfNovel = novel.chapters;

    return (
        <div className={styles["read-novel-page"]}>
            <div className={styles["header"]}>
                <Header changeTheme={changeTheme} />
            </div>
            <div className={styles["read-header"]}>
                <div className={styles["novel-header"]}>
                    <div className={styles["novel-info"]}>
                        <div className={styles["thumbnail-container"]}>
                            <img
                                src={novel.thumbnail}
                                alt={novel.title}
                                title={novel.title}
                            />
                        </div>
                        <div className={styles["info"]} title={novel.title}>
                            <p className={styles["novel-title"]}>
                                {" "}
                                {novel.title}{" "}
                            </p>
                            <p className={styles["novel-chapter"]}>
                                {chapter.chapterTitle}
                            </p>
                        </div>
                    </div>
                    <div className={styles["button-list"]}>
                        <div className="button" onClick={toggleChapters}>
                            <i className="fa-solid fa-list"> </i>
                        </div>
                    </div>
                    {showChapters && (
                        <div>
                            <div className={styles["chapter-list"]}>
                                <h3>Chapters</h3>
                                <ul>
                                    {chaptersOfNovel.map((chapter) => (
                                        <li key={chapter}>{chapter}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
                <div
                    className={styles["author-header"]}
                    title={author.username}
                >
                    <div className={styles["ava-container"]}>
                        <img src={author.ava} alt={author.username} />
                    </div>
                    <p className={styles["author-name"]}> {author.username} </p>
                </div>
            </div>
            <div className={styles["body"]}>
                <div className={styles["reading"]}>
                    <div className={styles["read-frame"]}>
                        <ReadFrame novel={novel} chapter={chapter} />
                    </div>
                    <div>
                        <CommentForm onCommentSubmit={handleCommentSubmit} />
                    </div>
                </div>
                <div className={styles["side-bar"]}>
                    <TopNovel novel={novels} onClick={clickNovel} />
                    <TopAuthor author={authors} onClick={clickAuthor} />
                </div>
            </div>
        </div>
    );
};

export default ReadNovelPage;
