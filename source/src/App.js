import React, { useState } from "react";
// import useLocalStorage from 'use-local-storage'
import "./App.css";
import "./styles/styles.css";
import NovelCard from "./components/NovelCard.js";
import Carousel from "./components/Carousel";
import NovelItem from "./components/NovelItem";
import TopNovel from "./components/TopNovel";


function App() {
  const [isDark, setTheme] = useState(false);
  const switchTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  const test = (novel) => {
    console.log(novel.id);
  };
  const testItem = () => {
	console.log("ok");
  }

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
		  author: "haha"
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
		  author: "haha"
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
		  author: "haha"
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
		  author: "haha"
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
		  author: "haha"
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
		  author: "haha"
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
		  author: "haha"
    }
  ];
  return (
    <div
      data-theme={isDark ? "dark" : "light"} className="app"
    >
      <Carousel title="Top" novel={novel} onClick={test}/>
	  <NovelItem novel={novel[0]} onClick={testItem}/>
	  <TopNovel novel={novel} onClick={test}/>
      <button onClick={switchTheme}> haha </button>
      <i className="fa-solid fa-arrow-right" color="blue"></i>
    </div>
  );
}

export default App;
