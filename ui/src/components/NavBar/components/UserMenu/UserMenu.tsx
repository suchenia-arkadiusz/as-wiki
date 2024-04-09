import styled from 'styled-components';
import { useAuthContext } from '../../../../contexts/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';

const UserMenuOverlay = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: none;
`;

const UserMenuContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  top: 70px;
  right: 10px;
  z-index: 1000;
  padding: 10px;
  min-width: 100px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
`;

const UserMenuItem = styled.button`
  border: none;
  background: inherit;
  cursor: pointer;
  padding: 5px 0;

  &:hover {
    background-color: #f2f2f2;
  }
`;

type Props = {
  onClose: () => void;
};

const UserMenu = (props: Props) => {
  const { onClose } = props;
  const authContext = useAuthContext();
  const navigate = useNavigate();

  const MENU_ITEMS = [
    {key: 'profile', value: 'Profile', action: () => {navigate('/user-profile');}},
    {key: 'separator'},
    {key: 'signOut', value: 'Sign Out', action: () => authContext.logout()},
  ];

  const renderMenuItems = () => MENU_ITEMS.map((item, index) =>
    (item.key === 'separator'
      ? <hr key={`separator-${index}`} data-testid={`UserMenu.item.separator-${index}`} />
      : (<UserMenuItem key={item.key}
        onClick={item.action}
        data-testid={`UserMenu.item.${item.key}`}
      >
        {item.value}
      </UserMenuItem>
      )));

  return (
    <UserMenuOverlay onClick={onClose} data-testid='UserMenu.overlay'>
      <UserMenuContainer data-testid='UserMenu.container'>
        {renderMenuItems()}
      </UserMenuContainer>
    </UserMenuOverlay>
  );
};

export default UserMenu;
