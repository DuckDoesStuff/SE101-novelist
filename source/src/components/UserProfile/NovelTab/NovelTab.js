import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import './NovelTab.css'
import NovelCard from "../../NovelCard/NovelCard";
import { getAllNovels, getNovel } from '../../../backend-api/API.js';
  


const NovelTab = ({user}) => {
    const [published, setPublished] = useState([]);
    const [library, setLibrary] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const testItem = () => {
        console.log("ok");
    }

	useEffect(() => {
        const fetchAllNovels = async () => {
            try {
                const publishedNovels = await Promise.all(
                    user.published.map(async (novelId) => {
                        const novelData = await getNovel(novelId);
                        return novelData
                    })
                );
                setPublished(publishedNovels);


                const libraryNovels = await Promise.all(
                    user.library.map(async (novelId) => {
                        const novelData = await getNovel(novelId);
                        return novelData
                    })
                );
                setLibrary(libraryNovels);
            } catch (error) {
                console.error('Error fetching all novels:', error);
            }
        };

        fetchAllNovels()
        .then(() => {
            setIsFetched(true);
        });
	}, []);

    if(!isFetched) {
        return (
            <div className="loading">
                <img src="/loading.svg"/>
            </div>
        );
    }

    const PublishedItem = () => {
        return (
            <div className="NovelListContainer">
                {published.map((val, key) =>
                    <NovelCard
                        key={key}
                        novel={val}
                        onClick={() => testItem()}
                    />
                )}
            </div>
        )
    }

    const LibraryItem = () => {
        return (
            <div className="NovelListContainer">
                {library.map((val, key) =>
                    <NovelCard
                        key={key}
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
            children: <LibraryItem/>,
        },
        {
            key: '2',
            label: 'Published',
            children: <PublishedItem/>,
        }
    ];

    return (
        <Tabs defaultActiveKey="1" items={items}/>
    );
};

export default NovelTab