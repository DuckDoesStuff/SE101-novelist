import React from "react";
import styles from "./NovelCard.module.css";
import Button from "../Button/Button";

const NovelCard = ({ user, novel, onClick }) => {
    const isUserAuthor = novel.author === user.id;
    const onEditClick = (novel) => {
        console.log(novel.id);
    };
    const handleEditClick = (e) => {
        e.stopPropagation(); // Ngăn chặn sự kiện lan truyền
        onEditClick(novel); // Gọi hàm xử lý khi bấm nút "Edit"
    };
    return (
        <div>
            <div
                className={styles["novel-card"]}
                title={novel.title}
                onClick={onClick}
            >
                <div className={styles["novel-thumbnail"]}>
                    <img src={novel.thumbnail} alt={novel.title} />
                </div>
                <div className={styles["tag"]}>
                    <p className={styles["genre"]}> {novel.genre[0]} </p>
                    <div className={styles["info"]}>
                        <p className={styles["novel-name"]}> {novel.title} </p>
                        <p className={styles["author"]}> {novel.author} </p>
                    </div>
                </div>
                {isUserAuthor && (
                    <div className={styles["edit-button"]}>
                        <Button onClick={handleEditClick}>
                            {" "}
                            <i className="fa-solid fa-pen-to-square"></i>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NovelCard;
