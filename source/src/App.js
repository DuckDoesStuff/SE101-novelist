import React, { useState } from 'react';
// import useLocalStorage from 'use-local-storage'
import './App.css';
import './styles/styles.css';
import NovelCard from './components/NovelCard';
import Header from './components/Header/Header';
import HorNovelCard from './components/HorNovelCard';

function App() {
  const [isDark, setTheme] = useState(false);
  const switchTheme = () => {
    setTheme(prevTheme => !prevTheme)
  }

  const [isLiked, setIsLiked] = useState(false);
  const inCreaseLike = () => {
    setIsLiked(prevLiked => !prevLiked);
  }

  return (

    <div data-theme={isDark ? 'dark' : 'light'}>
      <Header/>
      <HorNovelCard
      thumbnailSrc="author1.jpg"
      name="Mộng Cầm"
      genres={["Hài", "Tình cảm"]} // Truyền mảng các thể loại
      author="Lan Hồ Điệp"
      script="This is the script for the novel."
/>
    </div>
  );
}

export default App;
