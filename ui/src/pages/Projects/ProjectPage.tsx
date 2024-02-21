import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { type Project } from './types.ts';
import Loader from '../../components/Loader/Loader.tsx';
import { useRestApiContext } from '../../contexts/RestApiContext.tsx';
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

const ProjectPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const ProjectPage = () => {
  const params = useParams();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [project, setProject] = useState<Project>();
  const api = useRestApiContext();

  useEffect(() => {
    setIsLoaded(false);
    api.get(`/api/v1/projects/${params.id}`).then((response) => {
      if (response.status === 200) {
        response.json().then((data: Project) => {
          setProject(data);
          setIsLoaded(true);
        });
      }
    });
  }, []);

  return (
    <>
      {isLoaded
        ? (
          <ProjectPageContainer>
            <h1>{project?.name.toUpperCase()}</h1>
            <p>
              <strong>Total number of pages: </strong>
              {project?.numberOfPages}
            </p>
            <article data-color-mode='light'>
              <MdPreview
                modelValue={project?.description || ''}
                language='en-US'
                codeTheme='stackoverflow'/>
            </article>
          </ProjectPageContainer>
        )
        : (
          <Loader />
        )}
    </>
  );
};

export default ProjectPage;
