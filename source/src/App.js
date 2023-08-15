import React, { useState } from 'react';
// import useLocalStorage from 'use-local-storage'
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/styles.css';
import HomePage from './pages/HomePage.js';
import SearchPage from './pages/SearchPage.js'
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';



function App() {
  return (
 
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/signup" element={<SignUpPage />} style = {{backgroundColor:"var(--background-02)"}}/>
        <Route path="/signin" element={<SignInPage />} style = {{backgroundColor:"var(--background-02)"}}/>


    </Routes>
  );
}
  

export default App;
