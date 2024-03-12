import './NavBar.css';
import { Left, Right } from '../styles.ts';
import HorizontalSpacer from '../Spacer/HorizontalSpacer.tsx';
import Button from '../Button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './components/UserAvatar/UserAvatar.tsx';

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="app-navbar" data-testid="NavBar.container">
      <Left>
        <div>asWiki</div>
        <HorizontalSpacer marginLeft={10} marginRight={10}/>
        <Button onClick={() => navigate('/projects')}
          iconName='bi-folder2'
          text='Projects'
          padding={'7px 0 0 0'}
          data-testid='NavBar.button.projects'
        />
      </Left>
      <Right>
        <UserAvatar />
      </Right>
    </div>
  );
};
