import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import API from './API';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/api' element={<API />} />
      </Routes>
    </Router>
  );
}

export default App;
