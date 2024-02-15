import './NavBar.css';
import { useUserContext } from '../../contexts/UserContext.tsx';
import avatar from '../../assets/images/user-default-avatar.png';
import { Left, Right } from '../styles.ts';
import HorizontalSpacer from '../Spacer/HorizontalSpacer.tsx';
import Button from '../Button/Button.tsx';
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const userContext = useUserContext();
  const navigate = useNavigate();
  const user = userContext.getUser();
  return (
    <div className="app-navbar" data-testid="NavBarContainer">
      <Left>
        <div>asWiki</div>
        <HorizontalSpacer marginLeft={10} marginRight={10}/>
        <Button onClick={() => navigate('/projects')} iconName='bi-folder2' text='Projects' padding={'7px 0 0 0'} />
      </Left>
      <Right>
        <div className="app-navbar-btn-container">
          <div>
            {user?.firstName} {user?.lastName}
          </div>
          <div>
            <img src={user?.avatarUrl || avatar} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="User's avatar" />
          </div>
        </div>
      </Right>
    </div>
  );
};
