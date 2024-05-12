import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { loginUser } from "../../api/authAdapter";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({ username, password });
            console.log("Login Response:", response.message);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="wrapper">
            <form onSubmit={handleLogin}>
                <h1 className="preview-name">PReview</h1>
                <h3>Login</h3>

                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                    <FaUser className="icon" />
                </div>

                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <FaLock className="icon" />
                </div>

                <div className="remember-forgot">
                    <label style={{ display: 'block' }}>
                        <input type="checkbox" />
                        Remember me
                    </label>
                    <a href="#" style={{ display: 'block' }}>Forgot Password?</a>
                </div>


                <button 
                    type="submit"
                >
                    Login
                </button>

            </form>

            <div className="register-link">
                <p>
                    Don't have an acoount? 
                    <a href="/signup">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;