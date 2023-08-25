import React, { useState } from "react";
import "./App.css";
import "./styles/styles.css";
import { Route, Routes } from "react-router-dom";

import EditNovelPage from "./pages/EditNovelPage.js";
import Carousel from "./components/Carousel";
import NovelItem from "./components/NovelItem";
import TopNovel from "./components/TopNovel";
import TopAuthor from "./components/TopAuthor";
import NovelCard from "./components/NovelCard";
import SearchPage from "./pages/SearchPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
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
      username: "Lan Ho Diep 123",
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
      author: "haha",
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
      author: "haha",
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
  return (
    <Routes>
      <Route path="search" element={<SearchPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="forgot" element={<ForgotPasswordPage />} />
      <Route path="" element={<HomePage />} />
    </Routes>
  );
}

export default App;