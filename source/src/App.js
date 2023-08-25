import React, { useState } from "react";
import "./App.css";
import "./styles/styles.css";
import EditNovelPage from "./pages/EditNovelPage.js";
import Carousel from "./components/Carousel";
import NovelItem from "./components/NovelItem";
import TopNovel from "./components/TopNovel";
import TopAuthor from "./components/TopAuthor";
import NovelCard from "./components/NovelCard";
import ViewCard from "./components/ViewCard";

function App() {
  return (
	<div>
		<EditNovelPage novelID={"custom_key"} />
	</div>
  );
}
  

export default App;
