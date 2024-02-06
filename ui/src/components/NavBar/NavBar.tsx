import './NavBar.css';
import { useUserContext } from '../../contexts/UserContext.tsx';
import avatar from '../../assets/images/user-default-avatar.png';

export const NavBar = () => {
  const userContext = useUserContext();
  const user = userContext.getUser();
  return (
    <div className="app-navbar" data-testid="NavBarContainer">
      asWiki
      <div className="app-navbar-btn-container">
        <div>
          {user?.firstName} {user?.lastName}
        </div>
        <div>
          <img src={user?.avatarUrl || avatar} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="User's avatar" />
        </div>
      </div>
    </div>
  );
};
