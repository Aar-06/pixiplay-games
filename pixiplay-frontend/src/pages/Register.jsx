import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BackgroundDecorations from "../components/BackgroundDecorations";
import "../styles/login.css";
import { register } from "../services/authService";

function Register() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {

        if (!username || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await register({
                username,
                email,
                password,
            });

            console.log("Registered:", response);

            alert("Registration successful!");

            navigate("/");

        } catch (error) {
            console.error("Registration Error:", error);
            alert("Registration failed.");
        }
    };

    return (
        <div className="login-page">

            <BackgroundDecorations />

            <div className="login-wrapper">

                <div className="page-header">
                    <h1 className="logo">PixiPlay</h1>
                    <p className="tagline">
                        Cute, Retro-Themed Mini Games!
                    </p>
                </div>

                <div className="login-card">

                    <div className="avatar"></div>

                    <h2>Create Account</h2>

                    <p className="welcome-text">
                        Join the Adventure!
                    </p>

                    <input
                        type="text"
                        placeholder="Username"
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="login-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <button
                        className="login-btn"
                        onClick={handleRegister}
                    >
                        REGISTER
                    </button>

                    <p className="register-text">
                        Already have an account?
                        <span>
                            <Link to="/">Login</Link>
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;