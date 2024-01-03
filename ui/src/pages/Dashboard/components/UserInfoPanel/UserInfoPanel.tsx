import styled from "styled-components";
import avatar from "../../../../assets/images/user-default-avatar.png";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext.tsx";

const UserInfoPanelContainer = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  padding: 10px;
  flex-basis: 33%;
  align-items: center;
  flex-direction: column;
`;

const UserInfoPanel = () => {
  const userContext = useContext(UserContext);
  const user = userContext?.getUser();
  return (
    <UserInfoPanelContainer data-testid="UserInfoPanelContainer">
      <h1>User info</h1>
      <img
        src={user?.avatarUrl || avatar}
        style={{ width: "300px", height: "300px", marginBottom: "20px", borderRadius: "50%" }}
        alt="User's avatar"
      />
      <h2>
        {user?.firstName} {user?.lastName}
      </h2>
      <div>{user?.email}</div>
    </UserInfoPanelContainer>
  );
};

export default UserInfoPanel;
