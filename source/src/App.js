import React, { useState } from "react";
import "./App.css";
import "./styles/styles.css";
import { Route, Routes } from "react-router-dom";

import EditNovelPage from "./pages/EditNovelPage.js";
import Carousel from "./components/Carousel/Carousel";
import NovelItem from "./components/NovelItem/NovelItem";
import TopNovel from "./components/TopNovel/TopNovel";
import TopAuthor from "./components/TopAuthor/TopAuthor";
import NovelCard from "./components/NovelCard/NovelCard";
import NovelViewCard from "./components/NovelViewCard/ViewCard"
import ViewCard from "./components/NovelViewCard/ViewCard";
import UserProfilePage from "./pages/UserProfilePage";
import NovelManagePage from "./pages/Admin/ManagePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import NovelViewPage from "./pages/NovelViewPage";
import ManagePage from "./pages/Admin/ManagePage";
import Header from "./components/Header/Header";
import SettingPage from "./pages/SettingPage";
import ReadNovelPage from "./pages/ReadNovelPage";
import Nhun from "./components/Nhun";
import { useTheme } from './components/ThemeProvider'; // Import the useTheme hook



function App() {
  const { isDark } = useTheme(); // Get isDark from the context
  const themeClass = isDark ? 'dark' : 'light';


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
  // return (
	// <div>
  //   <Routes>
  //     <Route path="search" element={<SearchPage />} />
  //     <Route path="signup" element={<SignUpPage />} />
  //     <Route path="signin" element={<SignInPage />} />
  //     <Route path="forgot" element={<ForgotPasswordPage />} />
  //     <Route path="" element={<HomePage />} />

  //   </Routes>
	// </div>
  // );

  return (
<div data-theme={themeClass} className="app">    
    <Routes>
      <Route path="search" element={<SearchPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="forgot" element={<ForgotPasswordPage />} />
      <Route path="homepage" element={<HomePage />} />
      <Route path="setting" element={<SettingPage />} />
      <Route path="userprofile" element={<UserProfilePage />} />
      
      <Route path="" element={<HomePage />} />
      <Route path="homepage" element={<HomePage />} />
      <Route path="setting" element={<SettingPage />} />
      <Route path="novel/:id" element={<NovelViewPage />} />
      <Route path="editnovel" element={<EditNovelPage novelID={null}/>} />

    </Routes>
	</div>
  );
}

export default App;