import React from "react";
import './SignUpForm.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const SignUpForm = () => {
    return (
        <div className="wrapper">
            <form action="">
                <h1 className="preview-name">PReview</h1>
                <h3>Register</h3>

                <div className="input-box">
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