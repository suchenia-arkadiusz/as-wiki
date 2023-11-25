import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.tsx";
import RecentlyViewedPanel from "./components/RecentlyViewedPanel/RecentlyViewedPanel.tsx";
import UserInfoPanel from "./components/UserInfoPanel/UserInfoPanel.tsx";

const DashboardPageContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const DashboardPage = () => {
  const userContext = useContext(UserContext);

  return (
    <>
      {userContext?.getUser() == null ? (
        <Navigate replace to="/" />
      ) : (
        <DashboardPageContainer>
          <RecentlyViewedPanel />
          <UserInfoPanel />
        </DashboardPageContainer>
      )}
    </>
  );
};

export default DashboardPage;
