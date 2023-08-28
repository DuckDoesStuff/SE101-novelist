import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import './NovelTab.css'
import NovelCard from "../../NovelCard/NovelCard";
import { getAllNovels } from '../../../backend-api/API.js';
  


const NovelTab = () => {
    const testItem = () => {
        console.log("ok");
    }

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
    const onChange = (key) => {
        console.log(key);
    };

    const TabItem = () => {
        return (
            <div className="NovelListContainer">
                {novels.map((val, key) =>
                    <NovelCard
                        user = {author["1"]}
                        novel={val}
                        onClick={() => testItem()}
                    />
                )}
            </div>
        )
    }

    const items = [
        {
            key: '1',
            label: 'Library',
            children: <TabItem/>,
        },
        {
            key: '2',
            label: 'Published',
            children: <TabItem/>,
        }
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    );
};

export default NovelTab