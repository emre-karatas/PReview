import React from "react";
import "./AnalyticDashboardsSidebar.css";
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  AppstoreOutlined
} from '@ant-design/icons';


import logo from '../../Componenets/Assets/logo.png';
const AnalyticDashboardsSidebar = ({ selectedDashboard }) => {
  const isDashboardSelected = (dashboardName) => {
    return selectedDashboard === dashboardName;
  };

  const renderMenuItem = (key, icon, text, to) => (
    <Menu.Item key={key} icon={icon} className={isDashboardSelected(key) ? "active" : ""}>
      {isDashboardSelected(key) ? text : <Link to={to}>{text}</Link>}
    </Menu.Item>
  );

  return (
    <div className="analytic-sidebar">
      <div className="analytic-sidebar-section">
        <div className="analytic-sidebar-title-container">
          <Link to="/analyticDashboards" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ marginRight: 10 }} />
            <h2 className="analytic-sidebar-title">PReview</h2>
          </Link>
        </div>
        <Menu
          defaultSelectedKeys={[selectedDashboard]}
          mode="inline"
          style={{ backgroundColor: '#1e1e2d', color: 'white' }}
          className="custom-sidebar"
        >
          {renderMenuItem("MainAnalytics", <AppstoreOutlined />, "Main Analytics Dashboard", "/AnalyticDashboards")}
          {renderMenuItem("DeveloperPerformance", <DesktopOutlined />, "Developer Performance Dashboard", "/DeveloperPerformanceDashboard")}
          {renderMenuItem("RepositoryDashboard", <PieChartOutlined />, "Repository Dashboard", "/RepositoryDashboard")}
          {renderMenuItem("Organization", <TeamOutlined />, "Organization", "/Organization")}
          {renderMenuItem("Profile", <IoPersonOutline />, "Profile", "/Profile")}
          {renderMenuItem("Logout", <IoLogOutOutline />, "Logout", "/Logout")}
        </Menu>
      </div>
    </div>
  );
};

export default AnalyticDashboardsSidebar;
