// import React from "react";
// import './ProfileCard.css'

// const ProfileCard = () => {
//     return (
//         <div className="wrapper">
//             <form action="">
//                 <h1 className="preview-name">PReview</h1>
//                 <h3>Profile</h3>
//             </form>
//         </div>
//     );
// };

// export default ProfileCard;

import React, { useState } from "react";
import './ProfileCard.css';

const ProfileCard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        fullName: "John Doe",
        email: "john@example.com",
        username: "johndoe",
        password: "********"
    });
    const [editedUserData, setEditedUserData] = useState({ ...userData });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserData({ ...editedUserData });
        setIsEditing(false);
    };

    return (
        <div className="profile">
            <h1>Profile Overview</h1>
            <div className="user-info">
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
                            type="password"
                            name="password"
                            value={editedUserData.password}
                            onChange={handleInputChange}
                        />
                    ) : (
                        <span>{userData.password}</span>
                    )}
                </div>
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
    );
};

export default ProfileCard;