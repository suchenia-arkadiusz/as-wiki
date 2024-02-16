import styled from 'styled-components';
import ProjectsTable from './components/ProjectsTable/ProjectsTable.tsx';
import { Left, Right } from '../../components/styles.ts';
import { useState } from 'react';
import Button from '../../components/Button/Button.tsx';
import CreateProjectPopup from './components/CreateProjectPopup/CreateProjectPopup.tsx';
import { Project } from './types.ts';

const ProjectsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const ProjectsPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

type ProjectCreateOrEditPopupProps = {
  isPopupOpen: boolean;
  isEdit: boolean;
  selectedProject: Project | undefined;
};

const ProjectsPage = () => {
  const [popupProps, setPopupProps] = useState<ProjectCreateOrEditPopupProps> ({isPopupOpen: false, isEdit: false, selectedProject: undefined});

  const openPopup = (isEdit: boolean, selectedProject: Project | undefined) => {
    setPopupProps({isEdit, isPopupOpen: true, selectedProject});
  };

  const closePopup = () => {
    setPopupProps({isEdit: false, isPopupOpen: false, selectedProject: undefined});
  };

  return (
    <ProjectsPageContainer data-testid="ProjectsPage.container">
      <ProjectsPageHeader data-testid="ProjectsPage.container.header">
        <Left data-testid="ProjectsPage.container.header.title">
          <h1>PROJECTS</h1>
        </Left>
        <Right data-testid="ProjectsPage.container.header.addProject">
          <Button iconName="bi-plus-lg" onClick={() => openPopup(false, undefined)} text="Add Project" />
        </Right>
      </ProjectsPageHeader>
      {popupProps.isPopupOpen ? <CreateProjectPopup onClose={closePopup} isEdit={popupProps.isEdit} selectedProject={popupProps.selectedProject} /> : null}
      <ProjectsTable openPopup={openPopup} />
    </ProjectsPageContainer>
  );
};

export default ProjectsPage;
