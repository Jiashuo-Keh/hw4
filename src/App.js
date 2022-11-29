import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Main from './components/Main/Main';
import Profile from './components/Profile/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';






function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="main" element={<Main />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
