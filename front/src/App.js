import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import API from './pages/API/API';
import Profile from './pages/Profile/Profile';
import AnalyticDashboardsMain from "./pages/AnalyticDashboardsMain";
import ChatbotTotalCostDashboard from "./pages/ChatbotTotalCostDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/api' element={<API />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/ChatbotTotalCostDashboard' element={<ChatbotTotalCostDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
