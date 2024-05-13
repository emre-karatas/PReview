import React from "react";
import "./AnalyticDashboardsSidebar.css";
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { IoPersonOutline, IoLogOutOutline } from "react-icons/io5";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';

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
          <h2 className="analytic-sidebar-title">PReview</h2>
        </div>
        <Menu
          defaultSelectedKeys={[selectedDashboard]}
          mode="inline"
          theme="dark"
          className="custom-sidebar"
        >
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
