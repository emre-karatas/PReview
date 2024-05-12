import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import API from './pages/API/API';
import Profile from './pages/Profile/Profile';
import AnalyticDashboardsMain from "./pages/Dashboards/AnalyticDashboardsMain";
import ChatbotTotalCostDashboard from "./pages/Dashboards/ChatbotTotalCostDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/api' element={<API />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/ChatbotTotalCostDashboard' element={<ChatbotTotalCostDashboard />} />
        <Route path='/analyticDashboards' element={<AnalyticDashboardsMain />} />
      </Routes>
    </Router>
  );
}

export default App;
