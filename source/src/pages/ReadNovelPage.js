import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import styles from "../styles/ReadNovelPage.module.css";
import TopAuthor from "../components/TopAuthor/TopAuthor";
import TopNovel from "../components/TopNovel/TopNovel";
import ReadFrame from "../components/ReadFrame/ReadFrame";
import CommentForm from "../components/Comment/CommentForm";
import { Link } from "react-router-dom";
import Footer from '../components/Footer/Footer.js';

import { getNovel, getChapter } from "../backend-api/API"

const ReadNovelPage = ({ novels, authors}) => {
    const { id } = useParams();
    const chapterID = id;

    const [novel, setNovel] = useState(null);
    const [chapter, setChapter] = useState(null);
    const [isFetched, setIsFetched] = useState(false);
    const [chaptersOfNovel, setChaptersOfNovel] = useState([]);
    const [comments, setComments] = useState([]);
    const [showChapters, setShowChapters] = useState(false);

    useEffect(() => {
        const fetchData = async (chapterID) => {
            const chapterData = await getChapter(chapterID);
            setChapter(chapterData);
            const novelData = await getNovel(chapterData.novel_id);
            setNovel(novelData);
        };

        fetchData(chapterID)
      }, []);

    useEffect(() => {
        const fetchChapters = async (chapter_id) => {
            if(chapter_id !== null) {
                const chapters = await Promise.all(
                chapter_id.map(async (chapterID) => {
                    try {
                        const chapterData = await getChapter(chapterID);
                        return chapterData;
                    } catch (error) {
                        console.error(`Error fetching chapter ${chapterID}:`, error);
                        return null;
                    }
                })
                )
                setChaptersOfNovel(chapters);
            }
        }
    
        if (novel !== null) {
            fetchChapters(novel.chapter_id)
            .then(() => {
                setIsFetched(true);
            })
        }
    }, [novel]);

    if (!isFetched) {
        return (
            <div>
                <Header/>
                <img src={"/loading.svg"} alt="loading" className="loading" />
            </div>
        )
    }

    // const novel = novels.find((novel) => novel.id === chapter.novelId);
    // const author = authors.find((author) => author.id === novel.author);


    const clickAuthor = (author) => {
        console.log(author.id);
    };
    const clickNovel = (novel) => {
        console.log(novel.id);
    };

    const handleCommentSubmit = (newComment) => {
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
    };

    const toggleChapters = () => {
        setShowChapters(!showChapters);
    };

    const handleChooseChapter = (id) => {
        const chapter = chaptersOfNovel.find((chapter) => chapter.id === id);
        setChapter(chapter);
    }

    const voTri = () => {
        console.log(novel);
        console.log(chapter);
    };

    return (
        <div className={styles["read-novel-page"]}>
            <div className={styles["header"]}>
                <Header />
            </div>

            {/* <Button onClick={voTri}>Vo Tri</Button> */}

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
                                {chapter.title}
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
                                        <Link to={`/readnovel/${chapter.id}`} key={chapter.id}>
                                        <li onClick={() => handleChooseChapter(chapter.id)} 
                                            key={chapter.id}>{chapter.title}
                                        </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                </div>

                {/* <div
                    className={styles["author-header"]}
                    title={author.username}
                >
                    <div className={styles["ava-container"]}>
                        <img src={author.ava} alt={author.username} />
                    </div>
                    <p className={styles["author-name"]}> {author.username} </p>
                </div> */}
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

                {/* <div className={styles["side-bar"]}>
                    <TopNovel novel={novels} onClick={clickNovel} />
                    <TopAuthor author={authors} onClick={clickAuthor} />
                </div> */}
            </div>

        </div>
    );
};

export default ReadNovelPage;
