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
			title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
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

	const author_columns = [
        {
			title: 'ID',
            dataIndex: 'author_id',
            key: 'author_id',
        },
		{
			title: 'Name',
            dataIndex: 'username',
            key: 'username',
        },
		{
			title: 'Published novels',
            dataIndex: 'novels',
            key: 'novels',
        },
		{
			title: 'Followers',
            dataIndex: 'followers',
            key: 'followers',
        }
	]

	return (
		<div className="Container">
			<div className="SidebarContainer">
				<div className="SidebarItems">
					<div 
						className={`SidebarItem ${isGenreSelected ? "active" : ""}`}
						onClick={handleGenreClick}
					>
						Genres
					</div>
					<div 
						className={`SidebarItem ${isNovelSelected ? "active" : ""}`}
						onClick={handleNovelClick}
					>
						Novels
					</div>
					<div 
						className={`SidebarItem ${isUserSelected ? "active" : ""}`}
						onClick={handleUserClick}
					>
						Users
					</div>
					<div 
						className={`SidebarItem ${isThemeSelected ? "active" : ""}`}
						onClick={handleThemeClick}
					>
						Themes
					</div>
					<div 
						className={`SidebarItem ${isNotifSelected ? "active" : ""}`}
						onClick={handleNotifClick}
					>
						Maintenance notification
					</div>
				</div>
        	</div>
			{isNovelSelected && (
				<div className="ManagementContainer">
					<h3>Novels</h3>
					<Table 
						columns={novel_columns}
                    	dataSource={novels} 
                    	pagination={{className: "pagination", defaultPageSize: 10, showSizeChanger:true}}/>
				</div>
			)}
        </div>
    );
};

export default NovelManagement