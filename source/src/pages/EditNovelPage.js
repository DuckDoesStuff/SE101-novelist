import React from "react";
import EditNovel from "../components/EditNovel/EditNovel";
import EditChapter from "../components/EditChapter/EditChapter";
import "../styles/EditNovelPage.css";

const EditNovelPage = () => {
  return (
    <div className="edit-novel-page">
      <EditNovel />
      <EditChapter />
    </div>
  );
};

export default EditNovelPage;
