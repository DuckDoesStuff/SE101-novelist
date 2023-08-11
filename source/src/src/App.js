import React, { useState } from 'react';
// import useLocalStorage from 'use-local-storage'
import './App.css';
import './styles/styles.css';
import ViewCard from './modules/NovelView/components/ViewCard';
import Button from './components/Button/Button';

function App() {
//   const [isDark, setTheme] = useState(false);
//   const switchTheme = () => {
//     setTheme(prevTheme => !prevTheme)
//   }

//   const [isLiked, setIsLiked] = useState(false);
//   const inCreaseLike = () => {
//     setIsLiked(prevLiked => !prevLiked);
//   }

//   return (
//     <div data-theme={isDark ? 'dark' : 'light'}>
//       <p onClick={switchTheme} className="click"> hahaha </p>
//       <button onClick={inCreaseLike} className="click" id='heart'> {isLiked ? <i className="fa-solid fa-heart"> </i> : <i className="fa-regular fa-heart"></i>} </button>
//       <button onClick={switchTheme} className="click"> click </button>
//     </div>
//   );
    return (
        <div className="App">
            <ViewCard></ViewCard>
        </div>
    )
}

export default App;
