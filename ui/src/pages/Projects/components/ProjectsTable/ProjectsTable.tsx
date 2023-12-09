import styled from "styled-components";
import Loader from "../../../../components/Loader/Loader.tsx";
import { useEffect, useState } from "react";
import ProjectLogo from "../ProjectLogo/ProjectLogo.tsx";
import TableRow from "./TableRow.tsx";
import { Project } from "../../types.ts";

const ProjectsTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const HeaderRow = styled.tr`
  height: 40px;
  border-bottom: 2px solid #707070;
`;

const HeaderCell = styled.th`
  color: #393939;
  font-weight: bold;
`;

const ProjectsTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<Array<Project>>([]);

  useEffect(() => {
    setTimeout(() => {
      const data: Array<Project> = [
        {
          id: "1",
          name: "asWiki",
          description: "Description 1",
          color: "#ffaeae",
        },
        {
          id: "2",
          name: "Some Interesting Project",
          description: "Description 2",
          color: "#ffffff",
          logoUrl: "https://t4.ftcdn.net/jpg/02/16/28/19/360_F_216281970_6gotBzdxtFD6vjh7RGmcc4X2JpJz3pr0.jpg",
        },
        {
          id: "3",
          name: "Project 3",
          description: "Description 3",
          color: "#97ffa8",
        },
      ].map((item) => ({
        ...item,
        logo: <ProjectLogo projectName={item.name} projectColor={item.color} logoUrl={item.logoUrl} />,
      }));
      setData(data);
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <>
      {isLoaded ? (
        <ProjectsTableContainer>
          <table style={{ borderCollapse: "collapse" }}>
            <thead>
              <HeaderRow>
                <HeaderCell style={{ width: "50px" }}></HeaderCell>
                <HeaderCell style={{ width: "600px", textAlign: "left" }}>NAME</HeaderCell>
                <HeaderCell style={{ width: "1161px", textAlign: "left" }}>DESCRIPTION</HeaderCell>
                <HeaderCell></HeaderCell>
              </HeaderRow>
            </thead>
            <tbody>
              {data.map((project: Project) => (
                <TableRow key={project.id} project={project} />
              ))}
            </tbody>
          </table>
        </ProjectsTableContainer>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProjectsTable;
