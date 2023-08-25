import React from "react";
import './NovelTab.css'

const NovelTab = () => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const tabs = $$(".tab-item");
    const panes = $$(".tab-pane");

    tabs.forEach((tab, index) => {
        const pane = panes[index];

        tab.onclick = function () {
            $(".tab-item.active").classList.remove("active");
            $(".tab-pane.active").classList.remove("active");


            this.classList.add("active");
            pane.classList.add("active");
        };
    });

    return (
        <div className="tab-container">
            <div class="tabs">
                <div class="tab-item active">Library</div>
                <div class="tab-item">Published</div>
            </div>

            <div class="tab-content">
                <div class="tab-pane active">
                <p>Library</p>
                </div>
                <div class="tab-pane">
                <p>Published</p>
                </div>
            </div>
        </div>
    );
};

export default NovelTab