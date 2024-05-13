import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import API from './pages/API/API';
import Profile from './pages/Profile/Profile';
import Logout from './pages/Logout/Logout';
import AnalyticDashboardsMain from "./pages/Dashboards/AnalyticDashboardsMain";
import DeveloperPerformanceDashboard from "./pages/Dashboards/DeveloperPerformanceDashboard";
import RepositoryDashboard from "./pages/Dashboards/RepositoryDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/api' element={<API />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/analyticDashboards' element={<AnalyticDashboardsMain />} />
        <Route path='/DeveloperPerformanceDashboard' element={<DeveloperPerformanceDashboard />} />
        <Route path='/RepositoryDashboard' element={<RepositoryDashboard />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
