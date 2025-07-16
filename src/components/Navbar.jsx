import { NavLink } from "react-router-dom";
import "../css/Navbar.css";
import logo from '../assets/logo.png';

export default function Navbar() {
  return (
    <div className="navbar">
      <nav className="navbar-content">

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
        
      </nav>
    </div>
  );
}