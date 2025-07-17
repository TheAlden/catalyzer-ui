import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/Navbar.css";
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    navigate("/");
  };
  
  return (
    <div className="navbar">
      <nav className="navbar-content">
        <div className="navbar-left-group">
              <NavLink to="/">
                <img
                  alt="logo"
                  className="navbar-logo"
                  src={logo}
                />
              </NavLink>

              <div className="navbar-links">
                <NavLink to="/create" className="navbar-link">
                  Create Cat
                </NavLink>
                <NavLink to="/cats" className="navbar-link">
                  Your Cats
                </NavLink>
              </div>
            </div>

        <div className="navbar-links-right">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="navbar-link">
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="navbar-link">
                Login
              </NavLink>
              <NavLink to="/signup" className="navbar-link">
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}