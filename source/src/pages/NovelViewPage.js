import React from "react";
import Header from "../components/Header/Header.js";
import ViewCard from "../components/NovelViewCard/ViewCard";
import { useParams } from "react-router-dom";
import Footer from '../components/Footer/Footer.js';

function NovelViewPage() {
    const { id } = useParams();
    const container = {
        padding: "32px 0",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    };

    return (
        <div className="novel-view-page">
            <Header />
            <div style={container}>
                <ViewCard novelID={id}/>
            </div>
            <Footer/>
        </div>
    );
}

export default NovelViewPage;
