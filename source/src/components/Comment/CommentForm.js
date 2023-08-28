import React, { useState } from "react";
import styles from './CommentForm.module.css'

const CommentForm = ({ onCommentSubmit }) => {
    const [comment, setComment] = useState("");

    const handleCommentChange = (event) => {
        setComment(event.target.value);
        event.target.style.height = "auto"; // Đặt lại chiều cao để tính lại
        event.target.style.height = (event.target.scrollHeight) + "px"; // Đặt chiều cao mới
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (comment.trim() !== "") {
            onCommentSubmit(comment);
            setComment("");
        }
    };

    return (
        <div className={styles["comment-frame"]}>
            <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Commenting..."
                className={styles["comment-form"]}
            />
            <button className={styles["send"]} onClick={handleSubmit}><i className="fa-solid fa-paper-plane"></i></button>
        </div>
    );
};

export default CommentForm;
