import React, { useState } from 'react';
// import useLocalStorage from 'use-local-storage'
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/styles.css';
import HomePage from './pages/HomePage.js';
import SearchPage from './pages/SearchPage.js'


function App() {
  return (
 
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}
  

export default App;
