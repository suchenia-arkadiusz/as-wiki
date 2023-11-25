import "./NavBar.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.tsx";

export const NavBar = () => {
  const userContext = useContext(UserContext);
  return (
    <div className="app-navbar">
      asWiki
      <div className="app-navbar-brn-container">{userContext?.getUser()?.username}</div>
    </div>
  );
};
