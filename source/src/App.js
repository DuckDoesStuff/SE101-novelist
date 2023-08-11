import React, { useState } from "react";
// import useLocalStorage from 'use-local-storage'
import "./App.css";
import "./styles/styles.css";
import NovelCard from "./components/NovelCard.js";

function App() {
  const [isDark, setTheme] = useState(false);
  const switchTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  const [isLiked, setIsLiked] = useState(false);
  const inCreaseLike = () => {
    setIsLiked((prevLiked) => !prevLiked);
  };
  const test = () => {
    console.log("ok");
  };

  return (
    <div
      data-theme={isDark ? "dark" : "light"}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        boxSizing: "100px",
      }}
    >
      <NovelCard read={test} like={test}> </NovelCard>
    </div>
  );
}

export default App;
