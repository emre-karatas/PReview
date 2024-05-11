import React, { useState, useEffect } from "react";
import "./AnalyticDashboardsSidebar.css";
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {
  BulbOutlined,
    DollarOutlined,
    UsergroupDeleteOutlined,
    FundViewOutlined

} from "@ant-design/icons";


const AnalyticDashboardsSidebar = ({selectedDashboard}) => {

  useEffect(() => {
    applyTextGradient("analytic-sidebar-title", [
      "#2B0AFF",
      "#C307F9",
      "#EA38C1",
      "#FF8CAF",
      "#FB8F8B",
    ]);
  }, []);

  function applyTextGradient(className, colors) {
      const elements = document.getElementsByClassName(className);
      Array.from(elements).forEach((element) => {
      element.style.background = `linear-gradient(to right, ${colors.join(", ")})`;
      element.style.webkitBackgroundClip = "text";
      element.style.color = "transparent";
      element.style.display = "inline-block";
    });
  }

  const isDashboardSelected = (dashboardName) => {
      console.log(dashboardName)
    return selectedDashboard === dashboardName;
  };

  return (
    <div className="analytic-sidebar">
        <div className="analytic-sidebar-section">
            <div className="analytic-sidebar-title-container">
                <h2 className="analytic-sidebar-title">Dashboards</h2>
            </div>
            <Sidebar>
               <Menu renderExpandIcon={({ open }) => <span>{open ? '-' : '+'}</span>} rootStyles={{
                    backgroundColor: 'white',
                    fontFamily: '"Circular", sans-serif',
                    fontSize: 12,
                }}
                     menuItemStyles={{
                         button: ({ level, active, disabled }) => {
                            if (level === 0)
                            return {
                                color: disabled ? '#f5d9ff' : '#d359ff',
                                backgroundColor: active ? '#eecef9' : undefined,
                            };
                        },
                     }}
               >
                   <MenuItem icon={<UsergroupDeleteOutlined />}> Active Users </MenuItem>
                    <SubMenu defaultOpen={true} label="Chatbot" icon={<BulbOutlined />}>
                        <MenuItem
                            icon={<DollarOutlined />}
                            className={isDashboardSelected("Chatbot/TotalCostDashboard") ? "menu-item-selected" : "menu-item"}
                            component={isDashboardSelected("Chatbot/TotalCostDashboard") ? undefined : <Link to="/AnalyticDashboards/Chatbot/TotalCostDashboard" />}
                        >
                            Chatbot Cost Dashboard
                        </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<FundViewOutlined />}> Grades </MenuItem>
                </Menu>
            </Sidebar>
        </div>
    </div>
  );
};

export default AnalyticDashboardsSidebar;
