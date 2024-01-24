import styled from "styled-components";
import PageListPanel from "./components/PageListPanel/PageListPanel.tsx";
import { useProjectsContext } from "../../contexts/ProjectsContext.tsx";
import { useLocation } from "react-router-dom";

const DocumentPageContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const DocumentPage = () => {
  const { projects } = useProjectsContext();
  const location = useLocation();
  const projectId = location.pathname.split("/")[2];

  return (
    <DocumentPageContainer data-testid="DocumentPageContainer">
      <PageListPanel projectName={projects.find((project) => project.id === projectId)?.name || "No Project"} />
      <h1>DocumentPage</h1>
    </DocumentPageContainer>
  );
};

export default DocumentPage;
