import "./NavBar.css";
import { Link, Outlet } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="app-navbar">
      asWiki
      <div className="app-navbar-brn-container">
        <Link to="/signup" className="app-navbar-btn">
          Sign Up
        </Link>
        <Link to="/signin" className="app-navbar-btn">
          Sign In
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
