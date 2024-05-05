import React, { useState } from "react";
import './SignUpForm.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const SignUpForm = () => {
    const [userType, setUserType] = useState('');

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userType === '') {
            alert('Please select a user type');
            return;
        }
        // Handle form submission
    };

    return (
        <div className="wrapper">
            <form action="">
                <h1 className="preview-name">PReview</h1>
                <h3>Register</h3>

                <div className="input-box-name">
                    <input type="text" placeholder="Full Name" required />
                </div>

                <div className="input-box">
                    <input type="email" placeholder="E-mail Address" required />
                    <FaEnvelope className="icon"/>
                </div>

                <div className="input-box">
                    <input type="text" placeholder="Username" required />
                    <FaUser className="icon" />
                </div>

                <div className="input-box">
                    <input type="password" placeholder="Password" required />
                    <FaLock className="icon" />
                </div>

                <div className="input-box">
                    <input type="password" placeholder="Re-Enter Password" required />
                    <FaLock className="icon" />
                </div>

                <div className="input-box">
                    <select className="input-select" value={userType} onChange={handleUserTypeChange} required>
                        <option className="input-option" value="" default>User Type</option>
                        <option className="input-option" value="developer">Developer</option>
                        <option className="input-option" value="team-lead">Team Lead</option>
                    </select>
                </div>

                <button type="submit">
                    Register
                </button>

                <div className="register-link">
                    <p>
                        Already have an acoount? 
                        <a href="/">
                            Log In
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;