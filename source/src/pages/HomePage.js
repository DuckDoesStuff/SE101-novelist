import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Header from '../components/Header/Header.js';
import { auth } from '../backend-api/FirebaseConfig.js';
import Carousel from '../components/Carousel/Carousel.js';

import { getAllNovels } from '../backend-api/API.js';
import 'firebase/firestore';


function HomePage() {
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
const novelTest = [
  {
      id: "1",
      title: "Con ga trong lang thang nhieu mau that ngo hahahaha",
      thumbnail: "image.jpg",
      genre: ["Tinh yeu", "Kich tinh"],
      status: "",
      content: [""],
      like: 0,
      view: 0,
      comment:0,
      comment_section: "",
      author: "1",
      chapters: ["1", "2"]
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
      comment:0,
      comment_section: "",
      author: "2",
      chapters: ["4", "5", "6"]
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
      comment:0,
      comment_section: "",
      author: "3",
      chapters: ["4", "5", "6"]
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
      comment:0,
      comment_section: "",
      author: "4",
      chapters: ["4", "5", "6"]
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
      comment:0,
      comment_section: "",
      author: "5",
      chapters: ["4", "5", "6"]
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
      comment:0,
      comment_section: "",
      author: "6",
      chapters: ["4", "5", "6"]
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
      comment:0,
      comment_section: "",
      author: "7",
      chapters: ["4", "5", "6"]
  },
];
const test = (novel) => {
  console.log(novel.id);
};
  auth.onAuthStateChanged((user) => {
    if (user) {
        // Người dùng đã đăng nhập, thực hiện hành động tương ứng
        console.log("Người dùng đã đăng nhập:", user.uid);

        // Lưu thông tin đăng nhập vào Local Storage
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        // Người dùng chưa đăng nhập, yêu cầu đăng nhập hoặc điều hướng đến trang đăng nhập
        console.log("Người dùng chưa đăng nhập.");

        // Xóa thông tin đăng nhập khỏi Local Storage
        localStorage.removeItem("user");
    }
});

const [novels, setNovels] = useState([]);

useEffect(() => {
  // Gọi hàm từ module để lấy tất cả truyện
  const fetchAllNovels = async () => {
    try {
      const allNovels = await getAllNovels();
      setNovels(allNovels);
    } catch (error) {
      console.error('Error fetching all novels:', error);
    }
  };

  fetchAllNovels();
}, []);

  return (
    // <div //data-theme={isDark ? 'dark' : 'light'}>
    <div>
      <Header/>
      <Carousel novel={novels} user={author} onClick={test} title={"Recent Novel"} />
      <Carousel novel={novels} user={author} onClick={test} title={"Popular"} />
    </div>
    
    );
  
}
export default HomePage;