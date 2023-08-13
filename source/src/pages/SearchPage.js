import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header.js";
import HorNovelCard from "../components/HorNovelCard.js";

function HomePage() {
  const novelList = [
    {
      thumbnailSrc: "/author1.jpg",
      name: "Mộng Cầm",
      genres: ["Comedy", "Romance"],
      author: "Lan Hồ Điệp",
      likes: "1000",
      script: "This is the script for the novel 1.",
    },
    {
      thumbnailSrc: "/author1.jpg",
      name: "Tiên Hiệp",
      genres: ["Action", "Thriller"],
      author: "Nguyễn Văn A",
      likes: "1000",
      script: "This is the script for the novel 2.",
    },
    {
      thumbnailSrc: "/author1.jpg",
      name: "Harry Potter và người lái đò Sông Đà",
      genres: ["School", "Horror"],
      author: "Nguyễn Văn A",
      likes: "1000",
      script: "This is the script for the novel 2.",
    },
    // Thêm thông tin các HorNovelCard khác vào đây
  ];

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "50px",
        }}
      >
        {novelList.map((novel, index) => (
          <HorNovelCard
            key={index}
            thumbnailSrc={novel.thumbnailSrc}
            name={novel.name}
            genres={novel.genres}
            author={novel.author}
            likes={novel.likes}
            script={novel.script}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
