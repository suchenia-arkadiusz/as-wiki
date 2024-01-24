import styled from "styled-components";
import { usePageListContext } from "../../../../contexts/PageListContext.tsx";

const PageListPanelContainer = styled.div`
  display: flex;
  width: 100%;
  border-right: 1px solid #d9d9d9;
  padding: 30px;
  flex-basis: 20%;
  flex-direction: column;
`;

const PageListPanel = () => {
  const pageListContext = usePageListContext();

  console.log(pageListContext.getPages());

  return (
    <PageListPanelContainer data-testid="PageListPanelContainer">
      <h1>PageListPanel</h1>
      {pageListContext.getPages().map((page) => (
        <div>{page.name}</div>
      ))}
    </PageListPanelContainer>
  );
};

export default PageListPanel;
