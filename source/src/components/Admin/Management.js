import React, { useState, useEffect } from "react";
import { Table } from "antd";
import './Management.css';
import { getAllNovels } from '../../backend-api/API.js';

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

	const [novels, setNovels] = useState([]);

	useEffect(() => {
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

    const novel_columns = [
        {
			title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
		{
			title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
		{
			title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
			render: (_, { genre }) => (
				<>
					{genre.map((genre) => {
					return (
						<p color="var(--background-01)" key={genre}>
							{genre}
						</p>
					);
					})}
				</>
			),
        },
		{
			title: 'Like',
            dataIndex: 'like',
            key: 'like',
        },
		{
			title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
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
					<Table 
						columns={novel_columns}
                    	dataSource={novels} 
                    	pagination={{className: "pagination", defaultPageSize: 50}}/>
				</div>
			)}
			{/* {isNovelSelected && (
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
			} */}
        </div>
    );
};

export default NovelManagement