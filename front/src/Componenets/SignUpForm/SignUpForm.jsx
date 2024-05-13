import React, { useState } from "react";
import './SignUpForm.css';
import { FaUser, FaLock, FaEnvelope, FaGithub } from "react-icons/fa";
import { signupUser } from "../../api/authAdapter";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const [userType, setUserType] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [github_repo, setGithubRepo] = useState(null);
    const [github_token, setGithubToken] = useState(null);
    const navigate = useNavigate();

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userType === '') {
            //alert('Please select a user type');
            return;
        }
        
        if (password !== confirmPassword) {
            //alert('Passwords do not match');
            return;
        }

        try {
            const response = await signupUser({ username, fullName, email, password, userType, github_repo, github_token });
            console.log("Signup Response:", response);

            if (response.message === "User created")
            {
                const confirmLogin = window.confirm("Signup was successful! Would you like to login?");
                if (confirmLogin) {
                    navigate("/");
                }
            }

        } catch (error) {
            console.error('Error:', error);
           // // alert('Failed to signup');
           return;
        }
    };
   
    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1 className="preview-name">PReview</h1>
                <h3>Register</h3>

                <div className="input-box-name">
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required 
                    />
                </div>

                <div className="input-box">
                    <input 
                        type="email" 
                        placeholder="E-mail Address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    <FaEnvelope className="icon"/>
                </div>

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

                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="Re-Enter Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <FaLock className="icon" />
                </div>

                <div className="input-box">
                    <select 
                        className="input-select" 
                        value={userType} 
                        onChange={handleUserTypeChange} 
                        required
                    >
                        <option className="input-option" value="" default>User Type</option>
                        <option className="input-option" value="developer">Developer</option>
                        <option className="input-option" value="team-lead">Team Lead</option>
                    </select>
                </div>

                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="GitHub Repo Link"
                        value={github_repo}
                        onChange={(e) => setGithubRepo(e.target.value)}
                        required
                    />
                    <FaGithub className="icon" />
                </div>

                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="GitHub Token"
                        value={github_token}
                        onChange={(e) => setGithubToken(e.target.value)}
                        required
                    />
                    <FaGithub className="icon" />
                </div>

                <button 
                    type="submit"
                >
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