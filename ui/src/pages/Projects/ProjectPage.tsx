import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { type Project } from './types.ts';
import Loader from '../../components/Loader/Loader.tsx';
import { useRestApiContext } from '../../contexts/RestApiContext.tsx';
import MDPreview from '../../components/MDEditor/MDPreview.tsx';
import Button from '../../components/Button/Button.tsx';
import CreateProjectPopup from './components/CreateProjectPopup/CreateProjectPopup.tsx';

const ProjectPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 100%;
`;

const ProjectPageEditButtonContainer = styled.div`
  position: absolute;
  background: none;
  right: 30px;
`;

const ProjectPage = () => {
  const params = useParams();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [project, setProject] = useState<Project>();
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const api = useRestApiContext();

  useEffect(() => {
    getProject();
  }, []);

  const closePopup = () => {
    setIsEditPopupOpen(false);
    getProject();
  };

  const getProject = () => {
    setIsLoaded(false);
    api.get(`/api/v1/projects/${params.id}`).then((response) => {
      if (response.status === 200) {
        response.json().then((data: Project) => {
          setProject(data);
          setIsLoaded(true);
        });
      }
    });
  };

  return (
    <>
      {isLoaded
        ? (
          <ProjectPageContainer data-testid='ProjectPage.container'>
            <h1>{project?.name.toUpperCase()}</h1>
            <ProjectPageEditButtonContainer>
              <Button
                data-testid="ProjectPage.button.editProject"
                iconName="bi-pen"
                onClick={() => {setIsEditPopupOpen(true);}}
              />
            </ProjectPageEditButtonContainer>
            <p>
              <strong>Total number of pages: </strong>
              {project?.numberOfPages}
            </p>
            <MDPreview value={project?.description || ''} />
            {isEditPopupOpen ? <CreateProjectPopup onClose={closePopup} selectedProject={project} isEdit /> : null}
          </ProjectPageContainer>
        )
        : (
          <Loader />
        )}
    </>
  );
};

export default ProjectPage;
