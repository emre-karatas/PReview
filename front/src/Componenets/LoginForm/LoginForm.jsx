import React from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";

const LoginForm = () => {
    return (
        <div className="wrapper">
            <form action="">
                <h1 className="preview-name">PReview</h1>
                <h3>Login</h3>

                <div className="input-box">
                    <input type="text" placeholder="Username" required />
                    <FaUser className="icon" />
                </div>

                <div className="input-box">
                    <input type="password" placeholder="Password" required />
                    <FaLock className="icon" />
                </div>

                <div className="remember-forgot">
                    <label style={{ display: 'block' }}>
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <a href="#" style={{ display: 'block' }}>Forgot Password?</a>
                </div>


                <button type="submit">
                    Login
                </button>

                <div className="register-link">
                    <p>
                        Don't have an acoount? 
                        <a href="/signup">
                            Register
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;