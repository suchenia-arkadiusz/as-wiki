import styled from "styled-components";
import ProjectsTable from "./components/ProjectsTable/ProjectsTable.tsx";
import { Left, Right } from "../../components/styles.ts";
import { useState } from "react";
import Button from "../../components/Button/Button.tsx";
import CreatePagePopup from "./components/CreatePagePopup/CreatePagePopup.tsx";

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
    <ProjectsPageContainer>
      <ProjectsPageHeader>
        <Left>
          <h1>PROJECTS</h1>
        </Left>
        <Right>
          <Button iconName="bi-plus-lg" onClick={() => setIsPopupOpen(true)} text="Add Project" />
        </Right>
      </ProjectsPageHeader>
      {isPopupOpen ? <CreatePagePopup onClose={() => setIsPopupOpen(false)} /> : null}
      <ProjectsTable />
    </ProjectsPageContainer>
  );
};

export default ProjectsPage;
