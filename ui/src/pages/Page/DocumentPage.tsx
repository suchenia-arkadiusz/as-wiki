import styled from "styled-components";
import PageListPanel from "./components/PageListPanel/PageListPanel.tsx";

const DocumentPageContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const DocumentPage = () => {
  return (
    <DocumentPageContainer data-testid="DocumentPageContainer">
      <PageListPanel />
      <h1>DocumentPage</h1>
    </DocumentPageContainer>
  );
};

export default DocumentPage;
