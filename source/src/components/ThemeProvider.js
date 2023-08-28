import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    setIsDark(prevIsDark => !prevIsDark);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <ThemeContext.Provider 
      value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
} 