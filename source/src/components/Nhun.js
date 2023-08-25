import React, { useState } from "react";
import "../styles/styles.css";
import Carousel from "./Carousel/Carousel";
import NovelItem from "./NovelItem/NovelItem";
import TopNovel from "./TopNovel/TopNovel";
import TopAuthor from "./TopAuthor/TopAuthor";
import NovelCard from "./NovelCard/NovelCard";

function Nhun() {
    const [isDark, setTheme] = useState(false);
    const switchTheme = () => {
        setTheme((prevTheme) => !prevTheme);
    };

    const test = (novel) => {
        console.log(novel.id);
    };

    const author = [
        {
            id: "1",
            username: "Lan Ho Diep 123 hahahahaaha",
            followers: 100,
            novels: 10,
            ava: "ava.jpg",
        },
        {
            id: "2",
            username: "Lan Ho Diep 123",
            followers: 100,
            novels: 10,
            ava: "ava.jpg",
        },
        {
            id: "3",
            username: "Nhung",
            followers: 100,
            novels: 10,
            ava: "ava.jpg",
        },
    ];

    const novel = [
        {
            id: "1",
            title: "Con ga trong lang thang nhieu mau that ngo hahahaha",
            thumbnail: "image.jpg",
            genre: ["Tinh yeu", "Kich tinh"],
            status: "",
            content: [""],
            like: 0,
            view: 0,
            comment_section: "",
            author: "Nhung",
        },
        {
            id: "2",
            title: "Lan Ho Diep 123",
            thumbnail: "image.jpg",
            genre: ["Tinh yeu"],
            status: "",
            content: [""],
            like: 0,
            view: 0,
            comment_section: "",
            author: "Nhung",
        },
        {
            id: "3",
            title: "Mot cau chuyen gi do",
            thumbnail: "image.jpg",
            genre: ["Kich tinh"],
            status: "",
            content: [""],
            like: 0,
            view: 0,
            comment_section: "",
            author: "haha",
        },
        {
            id: "4",
            title: "Mot cau chuyen gi do",
            thumbnail: "image.jpg",
            genre: ["Kich tinh"],
            status: "",
            content: [""],
            like: 0,
            view: 0,
            comment_section: "",
            author: "haha",
        },
        {
            id: "5",
            title: "Mot cau chuyen gi do",
            thumbnail: "image.jpg",
            genre: ["Kich tinh"],
            status: "",
            content: [""],
            like: 0,
            view: 0,
            comment_section: "",
            author: "haha",
        },
        {
            id: "6",
            title: "Con ga trong lang thang nhieu mau that ngo",
            thumbnail: "image.jpg",
            genre: ["Dammy"],
            status: "",
            content: [""],
            like: 0,
            view: 0,
            comment_section: "",
            author: "haha",
        },
        {
            id: "7",
            title: "Lan Ho Diep 123",
            thumbnail: "image.jpg",
            genre: ["Tinh yeu"],
            status: "",
            content: [""],
            like: 0,
            view: 0,
            comment_section: "",
            author: "haha",
        },
    ];

    const currentUser = {
            id: "3",
            username: "Nhung",
            followers: 100,
            novels: 10,
            ava: "ava.jpg",
        };

    const testItem = () => {
        console.log(currentUser["username"]);
    };
    return (
        <div data-theme={isDark ? "dark" : "light"} className="app">
            <Carousel
                user={currentUser}
                title="Top"
                novel={novel}
                onClick={test}
            />
            <NovelCard
                user={currentUser}
                novel={novel[0]}
                onClick={() => testItem()}
            />
            <NovelItem novel={novel[0]} onClick={test} />
            <TopNovel novel={novel} onClick={test} />
            <TopAuthor author={author} onClick={test} />
            <button onClick={switchTheme}> haha </button>
            <i className="fa-solid fa-arrow-right" color="blue"></i>
        </div>
    );
}

export default Nhun;
