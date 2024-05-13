import React, { useState, useEffect } from "react";
import Navbar from "../../pages/Dashboards/Navbar";
import AnalyticDashboardsSidebar from "../../pages/Dashboards/AnalyticDashboardsSidebar";
import { getUserByUserName, updateUserByUserName } from "../../api/authAdapter";
import './ProfileCard.css';

const ProfileCard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        githubRepo: "",
        githubToken: ""
    });
    const [editedUserData, setEditedUserData] = useState({ ...userData });

    useEffect(() => {
        const userDataFromLocalStorage = {
            fullName: localStorage.getItem("full_name"),
            email: localStorage.getItem("email"),
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
            githubRepo: localStorage.getItem("github_repo"),
            githubToken: localStorage.getItem("github_token")
        };
        setUserData(userDataFromLocalStorage);
        setEditedUserData(userDataFromLocalStorage);
        fetchUserData(userDataFromLocalStorage.username);
    }, []);

    const fetchUserData = async (username) => {
        try {
            const response = await getUserByUserName(username);

            console.log("user response: ", response);
            setUserData({
                email: response.user.email,
                fullName: response.user.full_name,
                githubRepo: response.user.github_repo,
                githubToken: response.user.github_token,
                password: response.user.password,
                userType: response.user.user_type,
                username: response.user.username
            });
            setEditedUserData({
                email: response.user.email,
                fullName: response.user.full_name,
                githubRepo: response.user.github_repo,
                githubToken: response.user.github_token,
                password: response.user.password,
                userType: response.user.user_type,
                username: response.user.username
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData({
            ...editedUserData,
            [name]: value
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedUserData({ ...userData });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateUserByUserName(userData.username, editedUserData);
            setUserData({ ...editedUserData });
            alert("Changes are saved!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <AnalyticDashboardsSidebar />
            <div className="profile">
                <h1>Profile Overview</h1>
                <div className="user-info">
                    {userData && (
                        <>
                            <div className="info-item">
                                <label>Full Name:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={editedUserData.fullName}
                                        onChange={handleInputChange}
                                        className="edit-input-box"
                                    />
                                ) : (
                                    <span>{userData.fullName}</span>
                                )}
                            </div>
                            <div className="info-item">
                                <label>Email:</label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={editedUserData.email}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{userData.email}</span>
                                )}
                            </div>
                            <div className="info-item">
                                <label>Username:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="username"
                                        value={editedUserData.username}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{userData.username}</span>
                                )}
                            </div>
                            <div className="info-item">
                                <label>Password:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="password"
                                        value={editedUserData.password}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{userData.password}</span>
                                )}
                            </div>
                            <div className="info-item">
                                <label>User Type:</label>
                                <span>{userData.userType}</span>
                            </div>
                            <div className="info-item">
                                <label>GitHub Repository Link:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="githubRepo"
                                        value={editedUserData.githubRepo}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{userData.githubRepo}</span>
                                )}
                            </div>
                            <div className="info-item">
                                <label>GitHub Token</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="githubToken"
                                        value={editedUserData.githubToken}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{userData.githubToken}</span>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <div className="button-container">
                    {isEditing ? (
                        <>
                            <button onClick={handleSubmit}>Save</button>
                            <button onClick={handleCancelClick}>Cancel</button>
                        </>
                    ) : (
                        <button onClick={handleEditClick}>Edit</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
