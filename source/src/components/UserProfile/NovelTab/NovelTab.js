import React from "react";
import './NovelTab.css'
import NovelCard from "../../NovelCard/NovelCard";


const NovelTab = () => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const testItem = () => {
        console.log("ok");
    }

    const novel ={
          id: "1",
            title: "Con ga trong lang thang nhieu mau that ngo hahahaha",
            thumbnail: "image.jpg",
            genre: ["Tinh yeu", "Kich tinh"],
            status: "",
            content: [""],
            like: 0,
            view: 0,
            comment_section: "",
            author: "haha"
    }

    const currentUser = {
        id: "3",
        username: "Nhung",
        followers: 100,
        novels: 10,
        ava: "ava.jpg",
    };

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
                    <div class="NovelCardRow">    
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                    </div>
                    <div class="NovelCardRow">    
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                    </div>
                    <div class="NovelCardRow">    
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                    </div>
                </div>
                <div class="tab-pane">
                <div class="NovelCardRow">    
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                    </div>
                    <div class="NovelCardRow">    
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                        <NovelCard
                            user={currentUser}
                            novel={novel}
                            onClick={() => testItem()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NovelTab