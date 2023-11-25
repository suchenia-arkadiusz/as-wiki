import "./NavBar.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.tsx";
import avatar from "../../assets/images/user-default-avatar.png";

export const NavBar = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.getUser();
  return (
    <div className="app-navbar">
      asWiki
      <div className="app-navbar-btn-container">
        <div>
          {user?.firstName} {user?.lastName}
        </div>
        <div>
          <img src={user?.avatarUrl || avatar} style={{ width: "50px", height: "50px", borderRadius: "50%" }} alt="User's avatar" />
        </div>
      </div>
    </div>
  );
};
