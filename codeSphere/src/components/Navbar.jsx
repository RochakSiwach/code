import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/CodeSphere.png";
import "./navbar.css";
import { logoutRequest } from "../auth/api";
import {
  clearAuthSession,
  getAuthToken,
  getStoredUser,
} from "../auth/storage";

const Navbar = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(getStoredUser());

  useEffect(() => {
    function syncUser() {
      setAuthUser(getStoredUser());
    }

    window.addEventListener("storage", syncUser);
    window.addEventListener("focus", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener("focus", syncUser);
    };
  }, []);

  async function handleLogout() {
    const token = getAuthToken();

    try {
      if (token) {
        await logoutRequest(token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      clearAuthSession();
      setAuthUser(null);
      navigate("/login");
    }
  }

  return (
    <nav className="navbar">
      <div className="navHeading">
        <NavLink to="/">
          <img src={Logo} alt="CodeSphere logo" />
        </NavLink>
      </div>

      <div className="navMainLink">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/documentation">Docs</NavLink>
        <NavLink to="/developer">Developers</NavLink>
        <NavLink to="/interviewer">Interviewers</NavLink>
        <NavLink to="/code-editor">Code Editor</NavLink>
        <NavLink to="/chat-portal">Chat Portal</NavLink>
      </div>

      <div className="auth">
        {authUser ? (
          <>
            <div className="auth-user">
              <span className="auth-user-label">Signed in as</span>
              <strong>{authUser.firstName}</strong>
            </div>
            <button type="button" className="auth-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup" className="primary">
              Get Started
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
