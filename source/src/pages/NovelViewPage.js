import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header.js";
import ViewCard from "../components/NovelViewCard/ViewCard";
import Carousel from '../components/Carousel/Carousel.js';
import Footer from '../components/Footer/Footer.js';
import { getAllNovels, getNovel } from '../backend-api/API.js';
import { useParams } from "react-router-dom";

function NovelViewPage() {
    const container = {
        padding: "32px 0",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    };
    const { id } = useParams();

    const test = (novel) => {
        console.log(novel.id);
    };

    const [novels, setNovels] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        // Gọi hàm từ module để lấy tất cả truyện
        const fetchAllNovels = async () => {
          try {
            const allNovels = await getAllNovels();
            setNovels(allNovels);
          } catch (error) {
            console.error('Error fetching all novels:', error);
          }
        };
    
        fetchAllNovels()
        .then(() => {
          setIsFetched(true);
        })
    }, []);

    return (
        <div className="novel-view-page">
            <Header />
            <div style={container}>
                <ViewCard novelID={id}/>
                <Carousel novel={novels} onClick={test} title={"Maybe you also like"} />
            </div>
          <Footer />
        </div>
    );
}

export default NovelViewPage;
