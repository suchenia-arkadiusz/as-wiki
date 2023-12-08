import styled from "styled-components";
import ProjectsTable from "./components/ProjectsTable/ProjectsTable.tsx";

const ProjectsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const ProjectsPage = () => {
  return (
    <ProjectsPageContainer>
      <h1>PROJECTS</h1>
      <ProjectsTable />
    </ProjectsPageContainer>
  );
};

export default ProjectsPage;
