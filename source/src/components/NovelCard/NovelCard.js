import React from "react";
import { Link } from "react-router-dom";
import styles from "./NovelCard.module.css";
import Button from "../Button/Button";
import { auth } from "../../backend-api/FirebaseConfig";
import { getUser } from "../../backend-api/API";
import { useEffect } from "react";
import { useState } from "react";

const NovelCard = ({ novel }) => {
    const [isUserAuthor, setIsUserAuthor] = useState(false);
    const checkCurrentUser = () => {
        if (auth.currentUser) {
            setIsUserAuthor(novel.author_id === auth.currentUser.uid);
        }
    };
    const [isFetched, setIsFetched] = useState(false);
    const [author, setAuthor] = useState("");

    useEffect(() => {
        const fetchAuthor = async () => {
            await getUser(novel.author_id).then((data) => {
                setAuthor(data);
            });
        };
        checkCurrentUser();
        fetchAuthor().then(() => {
            setIsFetched(true);
        });
    }, []);

    if (!isFetched) {
        return (
            <div className="loading">
                <img src="loading.svg" />
            </div>
        );
    }

    return (
        <Link to={`/novel/${novel.id}`}>
            <div className={styles["novel-card"]} title={novel.title}>
                <div className={styles["novel-thumbnail"]}>
                    <img src={novel.thumbnail} alt={novel.title} />
                </div>
                <div className={styles["tag"]}>
                    <p className={styles["genre"]}> {novel.genre[0]} </p>
                    <div className={styles["info"]}>
                        <p className={styles["novel-name"]}> {novel.title} </p>
                        <p className={styles["author"]}> {author.name} </p>
                    </div>
                </div>
                {isUserAuthor && (
                    <div className={styles["edit-button"]}>
                        <Link to={`/editnovel/${novel.id}`}>
                            <Button>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default NovelCard;
