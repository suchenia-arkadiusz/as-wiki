import styled from "styled-components";
import { useContext } from "react";
import { RecentlyViewedContext } from "../../../../contexts/RecentlyViewedContext.tsx";
import { Link } from "react-router-dom";

const RecentlyViewedPanelContainer = styled.div`
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  padding: 10px;
  flex-basis: 66%;
`;

const RecentlyViewedPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
  margin: 5px 0;
`;

const RecentlyViewedPanel = () => {
  const recentlyViewedContext = useContext(RecentlyViewedContext);

  return (
    <RecentlyViewedPanelContainer data-testid="RecentlyViewedPanelContainer">
      <h1>Recently viewed</h1>
      {recentlyViewedContext?.getRecentlyViewed()?.map((page) => (
        <RecentlyViewedPageContainer key={page.id} data-testid="RecentlyViewedPageContainer">
          <div data-testid="RecentlyViewedPageContainer.name">
            <Link className="app-default-link" to={`/pages/${page.id}`}>
              {page.name}
            </Link>{" "}
            updated at {page.updatedAt.toLocaleString()}
          </div>
          <div data-testid="RecentlyViewedPageContainer.modifiedBy">
            Last modified by{" "}
            <Link className="app-default-link" to={`/users/${page.username}`}>
              {page.updatedBy}
            </Link>
          </div>
        </RecentlyViewedPageContainer>
      ))}
    </RecentlyViewedPanelContainer>
  );
};

export default RecentlyViewedPanel;
