import React from 'react';
import useLocalStorage from 'use-local-storage'
import './App.css';
import './styles/styles.css';


function App() {
  const [theme, setTheme] = useLocalStorage('theme' ? 'dark' : 'light')
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  }
  return (
    <div data-theme={theme}>
      <button onClick={switchTheme} className='click'> click </button>
    </div>
  );
}

export default App;
