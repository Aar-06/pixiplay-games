import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BackgroundDecorations from "../components/BackgroundDecorations";
import "../styles/login.css";
import { login } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await login({
                email,
                password,
            });

            console.log(response);

            localStorage.setItem("user", JSON.stringify(response));

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert("Invalid email or password");
        }
    };

    return (
        <div className="login-page">

            <BackgroundDecorations />

            <div className="login-wrapper">

                <div className="page-header">
                    <h1 className="logo">PixiPlay</h1>
                    <p className="tagline">Cute, Retro-Themed Mini Games!</p>
                </div>

                <div className="login-card">

                    <div className="avatar"></div>

                    <h2>Welcome Back!</h2>

                    <p className="welcome-text">
                        Continue your Adventure!
                    </p>

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

                    <button
                        className="login-btn"
                        onClick={handleLogin}
                    >
                        LOGIN
                    </button>

                    <p className="register-text">
                        New Player?
                        <span>
                            <Link to="/register">Register</Link>
                        </span>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Login;