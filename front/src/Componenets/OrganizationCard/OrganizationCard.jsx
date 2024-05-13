import React, { useState, useEffect } from "react";
import Navbar from "../../pages/Dashboards/Navbar";
import AnalyticDashboardsSidebar from "../../pages/Dashboards/AnalyticDashboardsSidebar";
import './OrganizationCard.css';

const OrganizationCard = () => {
    const [organizationData, setOrganizationData] = useState({
        organization_name: "test",
        githubRepo: "test",
        githubToken: "test"
    });
    const [editedOrganizationData, setEditedOrganizationData] = useState({ ...organizationData });

    useEffect(() => {
        const userDataFromLocalStorage = {
            organization_name: localStorage.getItem("org_name"),
            githubRepo: localStorage.getItem("github_repo"),
            githubToken: localStorage.getItem("github_token")
        };
        setOrganizationData(userDataFromLocalStorage);
        setEditedOrganizationData(userDataFromLocalStorage);
    }, []);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedOrganizationData({
            ...editedOrganizationData,
            [name]: value
        });
    };


    return (
        <div>
            <Navbar />
            <AnalyticDashboardsSidebar />
            <div className="profile">
                <h1>Organization Overview </h1>
                <div className="user-info">
                    {organizationData && (
                        <>
                            <div className="info-item">
                                <label>Organization Name:</label>
                                    <span>{organizationData.organization_name}</span>

                            </div>
                            <div className="info-item">
                                <label>GitHub Organization Link:</label>
                                    <span>{organizationData.githubRepo}</span>
                            </div>
                            <div className="info-item">
                                <label>GitHub Token: </label>
                                    <span>{organizationData.githubToken}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrganizationCard;
