import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import '../styles/Navbar.css'
// navbar component to navigate through all pages
// The use of context here is to manage user authentication state and provide navigation links based on whether the user is logged in or not.
export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="container">
          EventBook
        <div className="nav-links">
          <Link to="/">Home</Link>

          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/about-us">About Us</Link>
              {/* if the user logged in show logout button */}
              <button onClick={logout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>  
          )}
        </div>
      </div>
    </nav>
  );
}
