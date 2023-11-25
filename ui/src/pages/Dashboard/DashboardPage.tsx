import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.tsx";

const DashboardPageContainer = styled.div`
  padding: 10px;
  width: 100%;
`;

const DashboardPage = () => {
  const userContext = useContext(UserContext);

  return (
    <>
      {userContext?.getUser() === undefined ? (
        <Navigate replace to="/" />
      ) : (
        <DashboardPageContainer>
          Dashboard page
          <br /> {userContext.getUser()?.username}
        </DashboardPageContainer>
      )}
    </>
  );
};

export default DashboardPage;
