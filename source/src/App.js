import React, { useState } from "react";
import "./App.css";
import "./styles/styles.css";
import EditNovelPage from "./pages/EditNovelPage.js";
// import Carousel from "./components/Carousel";
// import NovelItem from "./components/NovelItem";
// import TopNovel from "./components/TopNovel";
// import TopAuthor from "./components/TopAuthor";
// import NovelCard from "./components/NovelCard";
import NovelViewCard from "./components/NovelViewCard/ViewCard"
import ViewCard from "./components/NovelViewCard/ViewCard";
import UserProfilePage from "./pages/UserProfilePage";
import NovelManagePage from "./pages/Admin/NovelManagePage";

function App() {
//   const [isDark, setTheme] = useState(false);
//   const switchTheme = () => {
//     setTheme((prevTheme) => !prevTheme);
//   };

//   const test = (novel) => {
//     console.log(novel.id);
//   };
//   const testItem = () => {
// 	console.log("ok");
//   }

//   const author = [
// 	{
// 		id: "1",
// 		username: "Lan Ho Diep 123 hahahahaaha",
// 		followers: 100,
// 		novels: 10,
// 		ava: "ava.jpg"
// 	},
// 	{
// 		id: "2",
// 		username: "Lan Ho Diep 123",
// 		followers: 100,
// 		novels: 10,
// 		ava: "ava.jpg"
// 	},
// 	{
// 		id: "3",
// 		username: "Lan Ho Diep 123",
// 		followers: 100,
// 		novels: 10,
// 		ava: "ava.jpg"
// 	}
//   ]

//   const novel = [
//     {
//       id: "1",
// 		  title: "Con ga trong lang thang nhieu mau that ngo hahahaha",
// 		  thumbnail: "image.jpg",
// 		  genre: ["Tinh yeu", "Kich tinh"],
// 		  status: "",
// 		  content: [""],
// 		  like: 0,
// 		  view: 0,
// 		  comment_section: "",
// 		  author: "haha"
//     },
//     {
//       id: "2",
// 		  title: "Lan Ho Diep 123",
// 		  thumbnail: "image.jpg",
// 		  genre: ["Tinh yeu"],
// 		  status: "",
// 		  content: [""],
// 		  like: 0,
// 		  view: 0,
// 		  comment_section: "",
// 		  author: "haha"
//     },
//     {
//       id: "3",
// 		  title: "Mot cau chuyen gi do",
// 		  thumbnail: "image.jpg",
// 		  genre: ["Kich tinh"],
// 		  status: "",
// 		  content: [""],
// 		  like: 0,
// 		  view: 0,
// 		  comment_section: "",
// 		  author: "haha"
//     },
//     {
//       id: "4",
// 		  title: "Mot cau chuyen gi do",
// 		  thumbnail: "image.jpg",
// 		  genre: ["Kich tinh"],
// 		  status: "",
// 		  content: [""],
// 		  like: 0,
// 		  view: 0,
// 		  comment_section: "",
// 		  author: "haha"
//     },
//     {
//       id: "5",
// 		  title: "Mot cau chuyen gi do",
// 		  thumbnail: "image.jpg",
// 		  genre: ["Kich tinh"],
// 		  status: "",
// 		  content: [""],
// 		  like: 0,
// 		  view: 0,
// 		  comment_section: "",
// 		  author: "haha"
//     },
//     {
//       id: "6",
// 		  title: "Con ga trong lang thang nhieu mau that ngo",
// 		  thumbnail: "image.jpg",
// 		  genre: ["Dammy"],
// 		  status: "",
// 		  content: [""],
// 		  like: 0,
// 		  view: 0,
// 		  comment_section: "",
// 		  author: "haha"
//     },
//     {
//       id: "7",
// 		  title: "Lan Ho Diep 123",
// 		  thumbnail: "image.jpg",
// 		  genre: ["Tinh yeu"],
// 		  status: "",
// 		  content: [""],
// 		  like: 0,
// 		  view: 0,
// 		  comment_section: "",
// 		  author: "haha"
//     }
//   ];
//   return (
//     <div
//       data-theme={isDark ? "dark" : "light"} className="app"
//     >
//       <Carousel title="Top" novel={novel} onClick={test}/>
// 	  <NovelCard novel={novel[0]} onClick={testItem}/>
// 	  <NovelItem novel={novel[0]} onClick={testItem}/>
// 	  <TopNovel novel={novel} onClick={test}/>
// 	  <TopAuthor author={author} onClick={test}/>
//       <button onClick={switchTheme}> haha </button>
//       <i className="fa-solid fa-arrow-right" color="blue"></i>
//     </div>
//   );
	return (
		<NovelManagePage/>
	)
}

export default App;
