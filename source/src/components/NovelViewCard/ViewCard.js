import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import './ViewCard.css';
import Button from '../Button/Button';
import { getNovel, getChapter, emptyNovel, emptyChapter } from "../../backend-api/API"


const ViewCard = (props) => {
    const [novel, setNovel] = useState(null);
    const [chapter, setChapter] = useState(null);
    const [chaptersOfNovel, setChaptersOfNovel] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        const fetchData = async (novel_id) => {
            const novelData = await getNovel(novel_id);
            setNovel(novelData);
        };

        fetchData(props.novelID)
        .then(() => {
            console.log("Loaded novel", props.novelID)
        })
    }, []);

    useEffect(() => {
        const fetchChapters = async (chapter_id) => {
            if(chapter_id !== null) {
                const chapters = await Promise.all(
                chapter_id.map(async (chapterID) => {
                    try {
                        const chapterData = await getChapter(chapterID);
                        return chapterData;
                    } catch (error) {
                        console.error(`Error fetching chapter ${chapterID}:`, error);
                        return null;
                    }
                })
                )
                setChaptersOfNovel(chapters);
            }
        }

        if(novel) {
            fetchChapters(novel.chapter_id)
            .then(() => {
                setIsFetched(true);
            })
        }
    }, [novel])

    const author =         
    {
        id: "1",
        username: "Lan Ho Diep 123 hahahahaaha",
        followers: 100,
        novels: 10,
        ava: "ava.jpg",
    }
    
    const columns = [
        {
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => <Link to={`/readnovel/${record.id}`} className='Chapter'>{text}</Link>
        }
    ]

    const [messageApi, notificationHolder] = message.useMessage();
    const uploadMessage = (content, type, duration) => {
        messageApi.destroy();
        messageApi.open({
          content: content,
          type: type,
          duration: duration,
          style: {
            marginTop: '20px',
        }
        })
    }
    const navigate = useNavigate();
    const handleClickRead = () => {
        if(chaptersOfNovel[0] !== undefined) {
            // window.location.href = "/readnovel/" + chaptersOfNovel[0].id;
            navigate(`/readnovel/${chaptersOfNovel[0].id}`);
        }else {
            uploadMessage("This novel doesn't have any chapters, check again later", "warning", 2);
        }
    }

    if (!isFetched) {
        console.log(chaptersOfNovel)
        return <div className='loading'> <img src="/loading.svg"/> </div>;
    }

    return (
        <div className='ViewCardContainer'>
            {notificationHolder}
            <div className='ViewCardInteract'>
                <img src={novel.thumbnail} alt='test image'></img>
                <div className='ViewCardButton'>
                    <Button onClick={handleClickRead}>Read</Button>
                    <div className='ViewCardButtonInteract'>
                        <Button><i class="fa-regular fa-heart"></i>Like</Button>
                        <Button><i class="fa-regular fa-flag"></i>Report</Button>
                    </div>
                </div>
            </div>

            <div className='ViewCardInfoContainer'>
                <div className='ViewCardInfoList'>
                    <p className='title'>{novel.title}</p>
                    <div className='author'>    
                        <img src={author.ava} alt='avatar'></img>
                        <p>{author.username}</p>
                    </div>
                    <div className='GenreList'>
                        {novel.genre.map((val, id) => <p className='genre' key={id}>{val}</p>)}
                    </div>
                    <p className='script'>{novel.description}</p>
                </div>
                <div className='NovelReact'>
                    <div className='react'><i class="fa-solid fa-heart"></i>{novel.like}</div>
                    <div className='react'><i class="fa-solid fa-comment"></i>{novel.comment}</div>
                </div>
            </div>

            <div className='ViewCardChapterList'>
                <p>Chapters</p>
                <Table 
                    columns={columns} 
                    dataSource={chaptersOfNovel} 
                    pagination={{className: "pagination", defaultPageSize: 10}}
                />
            </div>
        </div>

    );
};

export default ViewCard