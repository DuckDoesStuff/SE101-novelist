import React from "react";
import Header from "../components/Header/Header.js";
import ViewCard from "../components/NovelViewCard/ViewCard";

function NovelViewPage() {
    const container = {
        padding: "32px 0",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    };

    return (
        <div>
            <Header />
            <div style={container}>
                <ViewCard />
            </div>
        </div>
    );
}

export default NovelViewPage;
