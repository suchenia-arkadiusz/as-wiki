import styled from 'styled-components';
import RecentlyViewedPanel from './components/RecentlyViewedPanel/RecentlyViewedPanel.tsx';
import UserInfoPanel from './components/UserInfoPanel/UserInfoPanel.tsx';

const DashboardPageContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const DashboardPage = () => {
  return (
    <DashboardPageContainer data-testid="DashboardPageContainer">
      <RecentlyViewedPanel />
      <UserInfoPanel />
    </DashboardPageContainer>
  );
};

export default DashboardPage;
