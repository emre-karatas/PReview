import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import AnalyticDashboardsSidebar from "./AnalyticDashboardsSidebar";

export const AnalyticDashboardsMain = () => {
    return (
        <div>
            <NavBar activeSection="Dashboards"/>
            <AnalyticDashboardsSidebar/>
        </div>
    );

};
export default AnalyticDashboardsMain;
