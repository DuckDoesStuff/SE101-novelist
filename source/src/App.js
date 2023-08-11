import React from 'react';
// import useLocalStorage from 'use-local-storage'
import './App.css';
import './styles/styles.css';
// import NovelCard from './components/NovelCard';


// Backend API
import {test} from './backend-api/API'

function App() {
  // const [isDark, setTheme] = useState(false);
  // const switchTheme = () => {
  //   setTheme(prevTheme => !prevTheme)
  // }

  // const [isLiked, setIsLiked] = useState(false);
  // const inCreaseLike = () => {
  //   setIsLiked(prevLiked => !prevLiked);
  // }

  return (
    <div>
      <button onClick={test} className="click"> Run test </button>
      <UploadZone/>
    </div>
  );
}

export default App;
