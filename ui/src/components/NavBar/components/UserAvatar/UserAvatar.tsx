import avatar from '../../../../assets/images/user-default-avatar.png';
import { useUserContext } from '../../../../contexts/UserContext.tsx';
import styled from 'styled-components';
import { useState } from 'react';
import UserMenu from '../UserMenu/UserMenu.tsx';

const UserAvatarContainer = styled.div`
  background-color: inherit;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  gap: 20px;
  flex-direction: row;
  margin-top: 5px;
`;

const UserAvatarButton = styled.button`
  border: none;
  background: inherit;
  cursor: pointer;
  margin: auto;
  padding: auto;
`;

const UserAvatar = () => {
  const userContext = useUserContext();
  const user = userContext.getUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <UserAvatarContainer data-testid='UserAvatar.container'>
      <div>
        {user?.firstName} {user?.lastName}
      </div>
      <div>
        <UserAvatarButton onClick={() => setIsMenuOpen(!isMenuOpen)} data-testid='UserAvatar.button.avatar'>
          <img src={user?.avatarUrl || avatar}
            style={{width: '50px', height: '50px', borderRadius: '50%'}}
            alt="User's avatar"
          />
        </UserAvatarButton>
        {isMenuOpen ? <UserMenu onClose={() => setIsMenuOpen(false)}/> : null}
      </div>
    </UserAvatarContainer>
  );
};

export default UserAvatar;
