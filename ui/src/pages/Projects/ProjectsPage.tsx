import styled from "styled-components";
import ProjectsTable from "./components/ProjectsTable/ProjectsTable.tsx";
import { Left, Right } from "../../components/styles.ts";
import { useState } from "react";
import Button from "../../components/Button/Button.tsx";
import CreateProjectPopup from "./components/CreateProjectPopup/CreateProjectPopup.tsx";

const ProjectsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const ProjectsPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProjectsPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  return (
    <ProjectsPageContainer data-testid="ProjectsPage.container">
      <ProjectsPageHeader data-testid="ProjectsPage.container.header">
        <Left data-testid="ProjectsPage.container.header.title">
          <h1>PROJECTS</h1>
        </Left>
        <Right data-testid="ProjectsPage.container.header.addProject">
          <Button iconName="bi-plus-lg" onClick={() => setIsPopupOpen(true)} text="Add Project" />
        </Right>
      </ProjectsPageHeader>
      {isPopupOpen ? <CreateProjectPopup onClose={() => setIsPopupOpen(false)} /> : null}
      <ProjectsTable />
    </ProjectsPageContainer>
  );
};

export default ProjectsPage;
