import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import API from './API';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/api' element={<API />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
