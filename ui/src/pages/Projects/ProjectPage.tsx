import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Project } from "./types.ts";
import Loader from "../../components/Loader/Loader.tsx";
import { useRestApiContext } from "../../contexts/RestApiContext.tsx";

const ProjectPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const ProjectPage = () => {
  const params = useParams();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [project, setProject] = useState<Project & { numberOfPages: number }>();
  const api = useRestApiContext();

  useEffect(() => {
    setIsLoaded(false);
    api.get(`/api/v1/projects/${params.id}`).then((response) => {
      if (response.status === 200) {
        response.json().then((data: Project) => {
          setProject({ ...data, numberOfPages: getProjectNumberOfPages() });
          setIsLoaded(true);
        });
      }
    });
  }, []);

  const getProjectNumberOfPages = (): number => 10;

  return (
    <>
      {isLoaded ? (
        <ProjectPageContainer>
          <h1>{project?.name.toUpperCase()}</h1>
          <p>{project?.description}</p>
          <p>
            <strong>Total number of pages: </strong>
            {project?.numberOfPages}
          </p>
        </ProjectPageContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProjectPage;
