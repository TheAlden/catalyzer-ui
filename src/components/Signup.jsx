import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import "../css/Login.css";
import { signUp, login } from '../services/users.service'

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setIsLoggedIn } = useOutletContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await signUp(username, password);
            const token = await login(username, password);
            localStorage.setItem("access_token", token);
            setIsLoggedIn(true);
            navigate("/cats");
            window.location.reload();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="login-background-image">
        <div className="login-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} className="login-form">
            {error && <p className="error">{error}</p>}
            <label>
                Username:
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </label>

            <label>
                Password:
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </label>

            <button type="submit">Sign Up</button>
            </form>
        </div>
        </div>
    );
}