import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import './Management.css';
import { getAllNovels } from '../../backend-api/API.js';

const NovelManagement = () => {
	const [isNovelSelected, setNovel] = useState(true);
	const [isUserSelected, setUser] = useState(false);
	const [isThemeSelected, setTheme] = useState(false);
	const [isNotifSelected, setNotif] = useState(false);

	const handleNovelClick = () => {
		setNovel(true);
		setUser(false);
		setTheme(false);
		setNotif(false);
	};

	const handleUserClick = () => {
		setNovel(false);
		setUser(true);
		setTheme(false);
		setNotif(false);
	};

	const handleThemeClick = () => {
		setNovel(false);
		setUser(false);
		setTheme(true);
		setNotif(false);
	};

	const handleNotifClick = () => {
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

	const [searchText, setSearchText] = useState('');
	const [searchedColumn, setSearchedColumn] = useState('');
	const searchInput = useRef(null);
	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};
	const handleReset = (clearFilters) => {
		clearFilters();
		setSearchText('');
	};
	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
			<div
				style={{
					padding: 8,
				}}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
					marginBottom: 8,
					display: 'block',
					}}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size="small"
						style={{
							width: 90,
						}}
					>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size="small"
						style={{
							width: 90,
						}}
					>
						Reset
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							confirm({
							closeDropdown: false,
							});
							setSearchText(selectedKeys[0]);
							setSearchedColumn(dataIndex);
						}}
					>
						Filter
					</Button>
					<Button
						type="link"
						size="small"
						onClick={() => {
							close();
						}}
					>
						close
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? '#1890ff' : undefined,
				}}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
					backgroundColor: '#ffc069',
					padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	});

    const novel_columns = [
        {
			title: 'ID',
            dataIndex: 'id',
            key: 'id',
			width: '20%'
        },
		{
			title: 'Title',
            dataIndex: 'title',
            key: 'title',
			width: '40%',
			...getColumnSearchProps('title'),
        },
		{
			title: 'Author',
            dataIndex: 'author',
            key: 'author',
			width: '40%',
			...getColumnSearchProps('author'),
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
			filters: [
				{
					text: 'Mystery',
					value: 'Mystery',
				},
				{
					text: 'Thriller',
					value: 'Thriller',
				},
				{
					text: 'Romantic',
					value: 'Romantic',
				},
				{
					text: 'Adventure',
					value: 'Adventure',
				},
				{
					text: 'Danmei',
					value: 'Danmei',
				},
				{
					text: 'Sci-fi',
					value: 'Sci-fi',
				},
				{
					text: 'Horror',
					value: 'Horror',
				},
				{
					text: 'Action',
					value: 'Action',
				},
			],
			onFilter: (value, record) => record.genre.includes(value),
			filterSearch: true,
			width: '30%',
        },
		{
			title: 'Like',
            dataIndex: 'like',
            key: 'like',
			sorter: {
				compare: (a, b) => a.like - b.like,
				multiple: 1,
			},
			width: '20%',
        },
		{
			title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
			sorter: {
				compare: (a, b) => a.comment - b.comment,
				multiple: 1,
			},
			width: '20%',
        }
    ]

	const user_columns = [
        {
			title: 'ID',
            dataIndex: 'author_id',
            key: 'author_id',
        },
		{
			title: 'Name',
            dataIndex: 'name',
            key: 'name',
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

	const onChange = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	return (
		<div className="Container">
			<div className="SidebarContainer">
				<div className="SidebarItems">
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
						onChange={onChange}
                    	pagination={{className: "pagination", defaultPageSize: 10, showSizeChanger:true}}/>
				</div>
			)}
			{isUserSelected && (
				<div className="ManagementContainer">
					<h3>Users</h3>
					<Table 
						columns={user_columns}
						dataSource={novels} 
						onChange={onChange}
						pagination={{className: "pagination", defaultPageSize: 10, showSizeChanger:true}}/>
				</div>
			)}
        </div>
    );
};

export default NovelManagement