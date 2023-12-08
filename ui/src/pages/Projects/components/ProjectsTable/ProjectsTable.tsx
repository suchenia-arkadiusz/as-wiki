import styled from "styled-components";
import Icon from "../../../../components/Icon/Icon.tsx";
import Loader from "../../../../components/Loader/Loader.tsx";
import { useEffect, useState } from "react";

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

const TableRow = styled.tr`
  height: 50px;
  border-bottom: 1px solid #d9d9d9;
`;

const TableCell = styled.td`
  color: #747474;
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  color: #747474;
`;

const ProjectsTable = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState<Array<Project>>([]);

  useEffect(() => {
    setTimeout(() => {
      setData([
        {
          id: "1",
          name: "Project 1",
          description: "Description 1",
        },
        {
          id: "2",
          name: "Project 2",
          description: "Description 2",
        },
        {
          id: "3",
          name: "Project 3",
          description: "Description 3",
        },
      ]);
      setIsLoaded(true);
    }, 2000);
  }, []);

  const handleIconClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    alert("Icon clicked");
  };

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
                <TableRow onClick={() => alert(`${project.name} clicked`)}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>
                    <IconsContainer onClick={(e) => handleIconClick(e)}>
                      <Icon iconName="Pen" />
                      <Icon iconName="Trash" />
                    </IconsContainer>
                  </TableCell>
                </TableRow>
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
