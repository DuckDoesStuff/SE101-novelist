import React from "react";
import './NovelManagement.css'
import Sidebar from "./Sidebar";

const NovelManagement = () => {
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
        <div className="Container">
            <Sidebar/>
            <div className="ManagementContainer">
                <h3>Novel Management</h3>
                <div className="MyTable">
                    <table>
                        <tr className="RowTitle">
                            <th>Name</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>View</th>
                        </tr>

                        {novel.map((val, key) => {
                            let genre = "";
                            for (let i = 0; i < val.genre.length; i++) {
                                genre += val.genre[i]
                                if (i < val.genre.length - 1) {
                                    genre += ",";
                                }
                            }
                            return (
                                <tr key={key}>
                                    <td>{val.title}</td>
                                    <td>{val.author}</td>
                                    <td>{genre}</td>
                                    <td>{val.view}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NovelManagement