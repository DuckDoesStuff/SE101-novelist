import React, { useRef } from "react";
import Header from "../components/Header/Header";
import styles from "../styles/ReadNovelPage.module.css";
import TopAuthor from "../components/TopAuthor/TopAuthor";
import TopNovel from "../components/TopNovel/TopNovel";
import ReadFrame from "../components/ReadFrame/ReadFrame";

const ReadNovelPage = ({ chapter, novels, authors }) => {
    const novel = novels.find((novel) => novel.id === chapter.novelId);
    const author = authors.find((author) => author.id === novel.author);
    const clickAuthor = (author) => {
        console.log(author.id);
    };
    const clickNovel = (novel) => {
        console.log(novel.id);
    };
    const contentRef = useRef(null);
    const sideBarRef = useRef(null);

    const handleContentScroll = () => {
        sideBarRef.current.scrollTop = contentRef.current.scrollTop;
    };

    const handleSidebarScroll = () => {
        contentRef.current.scrollTop = sideBarRef.current.scrollTop;
    };
    return (
        <div>
            <div className={styles["header"]}>
                <Header />
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
                    <div className="button">
                        <i className="fa-solid fa-list"> </i>
                    </div>
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
                <div className={styles["reading"]} ref={contentRef}
            onScroll={handleContentScroll}>
                    <div className={styles["read-frame"]}>
                        <ReadFrame novel={novel} chapter={chapter} />
                    </div>
                </div>
                <div className={styles["side-bar"]} ref={sideBarRef}
            onScroll={handleSidebarScroll}>
                    <TopNovel novel={novels} onClick={clickNovel} />
                    <TopAuthor author={authors} onClick={clickAuthor} />
                </div>
            </div>
        </div>
    );
};

export default ReadNovelPage;
