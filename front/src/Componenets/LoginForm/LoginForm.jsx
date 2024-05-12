import React, { useState } from "react";
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { loginUser } from "../../api/authAdapter";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({ username, password });
            console.log("Login Response:", response);
            
            const user = response.user;
            console.log("user", user);
            const repo_owner = extractOwnerFromRepoUrl(user.github_repo);
            console.log("repo owner", repo_owner);

            if (response.message === "Login successful")
            {
                localStorage.setItem("repo_owner", repo_owner);
                localStorage.setItem("github_repo", user.github_repo);
                localStorage.setItem("github_token", user.github_token)
                navigate("/analyticDashboards");
            } else {
                alert("Username or password cannot be found! Please try again.")
            }

        } catch (error) {
            setError(error.message);
        }
    }

    const extractOwnerFromRepoUrl = (url) => {
        const match = url.match(/github\.com\/([^/]+)\/([^/]+)$/);
        if (match && match.length === 3) {
          return match[1];
        }
        return null;
      };

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