import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Space, Table, Modal, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import './Management.css';
import { getAllNovels ,getAllUsers} from '../../backend-api/API.js';

const EditNotif = (props) => {
	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};

	const validateMessages = {
		required: "${label} không được để trống!",
	};

	const stateNotif = {
		description: "",
		day: 0,
		month: 0,
		year: 0,
	};

	const stateModal = {
		ModalText: "Content of the modal",
		visible: false,
		confirmLoading: false,
	};

	const [inputs, setInputs] = useState(stateNotif);
	const [Modals, setModals] = useState(stateModal);

	const { description, day, month, year } = inputs;
	const { ModalText, visible, confirmLoading } = Modals;

	const [form] = Form.useForm();

	useEffect(() => {
		setInputs({
			...inputs,
			description: props.Description,
			day: props.Day,
			month: props.Month,
			year: props.Year,
		});
	}, [visible]);

	const showModal = () => {
		setModals({
			visible: true,
		});
	};
	
	const handleCancel = () => {
		setModals({
			visible: false,
		});
	// form.resetFields();
	};
	
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs((inputs) => ({ ...inputs, [name]: value }));
	//console.log(inputs);
	};

	const handleSubmit = () => {
		setModals({
			visible: false,
		});
	};

	return (
		<>
			<Button type="default" onClick={showModal} size="small">
        		Edit
      		</Button>
			<Modal
				title="Edit mantainance notification"
				visible={visible}
				onOk={form.submit}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
				onExit={props.reload}
      		>
				<Form
					{...layout}
					form={form}
					name="nest-messages"
					onFinish={handleSubmit}
					validateMessages={validateMessages}
				>
					<Form.Item label="Description" rules={[{ required: true }]}>
						<Input 
							name="description" 
							value={description} 
							onChange={handleChange} 
						/>
					</Form.Item>

					<Form.Item label="Day" rules={[{ required: true }]}>
						<Input
							name="day"
							value={day}
							onChange={handleChange}
						/>
					</Form.Item>

					<Form.Item label="Month" rules={[{ required: true }]}>
						<Input
							name="month"
							value={month}
							onChange={handleChange}
						/>
					</Form.Item>

					<Form.Item label="Year" rules={[{ required: true }]}>
						<Input
							name="year"
							value={year}
							onChange={handleChange}
						/>
					</Form.Item>
				</Form>
      		</Modal>s
		</>
	)
}

const NovelManagement = () => {
	const [isHomepageSelected, setHomepage] = useState(true);
	const [isNovelSelected, setNovel] = useState(false);
	const [isUserSelected, setUser] = useState(false);
	const [isNotifSelected, setNotif] = useState(false);

	const handleHomepageClick = () => {
		setHomepage(true);
		setNovel(false);
		setUser(false);
		setNotif(false);
	};


	const handleNovelClick = () => {
		setHomepage(false);
		setNovel(true);
		setUser(false);
		setNotif(false);
	};

	const handleUserClick = () => {
		setHomepage(false);
		setNovel(false);
		setUser(true);
		setNotif(false);
	};

	const handleNotifClick = () => {
		setHomepage(false);
		setNovel(false);
		setUser(false);
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

	const [users, setUsers] = useState([]);

	useEffect(() => {
	const fetchAllUsers = async () => {
		try {
		const AllUsers = await getAllUsers();
		setUsers(AllUsers);
		} catch (error) {
		console.error('Error fetching all novels:', error);
		}
	};

	fetchAllUsers();
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
			width: '20%',
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
            dataIndex: 'id',
            key: 'id',
			width: '20%'
        },
		{
			title: 'Name',
            dataIndex: 'name',
            key: 'name',
			width: '40%',
			...getColumnSearchProps('name'),
        },
		{
			title: 'Published novels',
            dataIndex: 'novels',
            key: 'novels',
			width: '20%',
        },
		{
			title: 'Followers',
            dataIndex: 'followers',
            key: 'followers',
			width: '20%',
        }
	]

	const notif_columns = [
        {
			title: 'Description',
            dataIndex: 'description',
            key: 'description',
			width: '50%',
        },
		{
			title: 'Day',
            dataIndex: 'day',
            key: 'day',
			width: '10%',
        },
		{
			title: 'Month',
            dataIndex: 'month',
            key: 'month',
			width: '10%',
        },
		{
			title: 'Year',
            dataIndex: 'year',
            key: 'year',
			width: '10%',
        },
		{
			title: 'Action',
            key: 'action',
			render: (text, record) => (
				<Space size="middle">
					<EditNotif
						Description={record.description}
						Day={record.day}
						Month={record.month}
						Year={record.year}
					/>
				</Space>
			),
        }
	]

	const onChange = (pagination, filters, sorter, extra) => {
		console.log('params', pagination, filters, sorter, extra);
	};

	const notif = [
		{
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque blandit enim egestas interdum fermentum. Vivamus in lectus suscipit, hendrerit eros sit amet, fringilla lectus. Fusce eget ante rhoncus neque accumsan aliquet. Morbi sodales vel ex non congue.",
			day: 28,
			month: 8,
			year: 2023,
		}
	]

	return (
		<div className="Container">
			<div className="SidebarContainer">
				<div className="SidebarItems">
					<div 
						className={`SidebarItem ${isHomepageSelected ? "active" : ""}`}
						onClick={handleHomepageClick}
					>
						Homepage
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
						className={`SidebarItem ${isNotifSelected ? "active" : ""}`}
						onClick={handleNotifClick}
					>
						Maintenance notification
					</div>
				</div>
        	</div>
			{isHomepageSelected && (
				<div className="ManagementContainer">
					<h3>Statistics</h3>
					<div className="StatisticsContainer">
						<div className="Statitic">
							<p className="Title">Total number of novels</p>
							<p className="Number">{novels.length}</p>
						</div>
						<div className="Statitic">
							<p className="Title">Total number of users</p>
							<p className="Number">{users.length}</p>
							{/* <p className="Number">1000</p> */}
						</div>
					</div>
				</div>
			)}
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
						dataSource={users} 
						onChange={onChange}
						pagination={{className: "pagination", defaultPageSize: 10, showSizeChanger:true}}/>
				</div>
			)} 
			{isNotifSelected && (
				<div className="ManagementContainer">
					<h3>Maintenance notification</h3>
					<Table 
						columns={notif_columns}
                    	dataSource={notif}
						pagination={false}/>
				</div>
			)}
        </div>
    );
};

export default NovelManagement