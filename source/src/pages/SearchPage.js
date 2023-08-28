import React from "react";
import Header from "../components/Header/Header.js";
import HorNovelCard from "../components/HorNovelCard/HorNovelCard.js";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { searchNovel } from "../backend-api/API.js";
import TopAuthor from "../components/TopAuthor/TopAuthor";
import TopNovel from "../components/TopNovel/TopNovel";
import styles from "../styles/SearchPage.module.css";


function SearchPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    const {authorName,setAuthorName} = useState();
    
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        // Gọi hàm tìm kiếm từ API sử dụng query và cập nhật state searchResults
        const fetchSearchResults = async () => {
            try {
                const results = await searchNovel(query);
                setSearchResults(results);
            } catch (error) {
                console.error("Error searching novels:", error);
            }
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query]);
    

    return (
        <div>
            <Header style={{ zIndex: "5" }} />
            <div className={styles["body"]}>
                <div className={styles["search-frame"]}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            marginTop: "50px",
                        }}
                    >
                        {searchResults.map((novel, index) => (
                            <HorNovelCard
                                novel={novel}
                                key={index}
                                thumbnailSrc={novel.thumbnail}
                                name={novel.title}
                                genres={novel.genre}
                                author={novel.author_id}
                                likes={novel.like}
                                script={novel.description}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles["side-bar"]}>
                    <TopNovel novel={searchResults} />
                    {/* <TopAuthor author={authors} onClick={clickAuthor} /> */}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
