import React, { useState } from "react";
import './Management.css';

const NovelManagement = () => {
	const [isGenreSelected, setGenre] = useState(true);
	const [isNovelSelected, setNovel] = useState(false);
	const [isUserSelected, setUser] = useState(false);
	const [isThemeSelected, setTheme] = useState(false);
	const [isNotifSelected, setNotif] = useState(false);

	const handleGenreClick = () => {
		setGenre(true);
		setNovel(false);
		setUser(false);
		setTheme(false);
		setNotif(false);
	};

	const handleNovelClick = () => {
		setGenre(false);
		setNovel(true);
		setUser(false);
		setTheme(false);
		setNotif(false);
	};

	const handleUserClick = () => {
		setGenre(false);
		setNovel(false);
		setUser(true);
		setTheme(false);
		setNotif(false);
	};

	const handleThemeClick = () => {
		setGenre(false);
		setNovel(false);
		setUser(false);
		setTheme(true);
		setNotif(false);
	};

	const handleNotifClick = () => {
		setGenre(false);
		setNovel(false);
		setUser(false);
		setTheme(false);
		setNotif(true);
	};

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

	const author = [
	{
		id: "1",
		username: "Lan Ho Diep 123 hahahahaaha",
		followers: 100,
		novels: 10,
		ava: "ava.jpg"
	},
	{
		id: "2",
		username: "Lan Ho Diep 123",
		followers: 100,
		novels: 10,
		ava: "ava.jpg"
	},
	{
		id: "3",
		username: "Lan Ho Diep 123",
		followers: 100,
		novels: 10,
		ava: "ava.jpg"
	}
	]	

	return (
		<div className="Container">
			<div className="SidebarContainer">
				<h3>Novelist</h3>
				<ul className="SidebarItems">
					<li 
						className={`SidebarItem ${isGenreSelected ? "active" : ""}`}
						onClick={handleGenreClick}
					>
						Genres
					</li>
					<li 
						className={`SidebarItem ${isNovelSelected ? "active" : ""}`}
						onClick={handleNovelClick}
					>
						Novels
					</li>
					<li 
						className={`SidebarItem ${isUserSelected ? "active" : ""}`}
						onClick={handleUserClick}
					>
						Users
					</li>
					<li 
						className={`SidebarItem ${isThemeSelected ? "active" : ""}`}
						onClick={handleThemeClick}
					>
						Themes
					</li>
					<li 
						className={`SidebarItem ${isNotifSelected ? "active" : ""}`}
						onClick={handleNotifClick}
					>
						Maintenance notification
					</li>
				</ul>
        	</div>
			{isNovelSelected && (
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
				)
			}
			{isUserSelected && (
				<div className="ManagementContainer">
				<h3>User Management</h3>
				<div className="MyTable">
					<table>
						<tr className="RowTitle">
							<th>ID</th>
							<th>Username</th>
							<th>Followers</th>
							<th>Novels</th>
						</tr>

						{author.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.id}</td>
                                    <td>{val.username}</td>
                                    <td>{val.followers}</td>
                                    <td>{val.novels}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
	            </div>
				)
			}
        </div>
    );
};

export default NovelManagement