import styled from "styled-components";
import ProjectLogo from "../ProjectLogo/ProjectLogo.tsx";
import TableRow from "./TableRow.tsx";
import { Project } from "../../types.ts";
import TableLoader from "../../../../components/Loader/TableLoader/TableLoader.tsx";
import { useProjectsContext } from "../../../../contexts/ProjectsContext.tsx";

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
  const projectsContext = useProjectsContext();

  return (
    <ProjectsTableContainer data-testid="ProjectsTable.container">
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <HeaderRow data-testid="ProjectsTable.table.header">
            <HeaderCell style={{ width: "50px" }}></HeaderCell>
            <HeaderCell style={{ width: "600px", textAlign: "left" }}>NAME</HeaderCell>
            <HeaderCell style={{ textAlign: "left" }}>DESCRIPTION</HeaderCell>
            <HeaderCell style={{ width: "100px" }}></HeaderCell>
          </HeaderRow>
        </thead>
        <tbody>
          {projectsContext.isLoaded ? (
            projectsContext.projects
              .map((item) => ({
                ...item,
                logo: <ProjectLogo projectName={item.name} projectColor={item.color} logoUrl={item.logoUrl} />,
              }))
              .map((project: Project) => <TableRow key={project.id} project={project} />)
          ) : (
            <TableLoader numOfColumns={4} />
          )}
        </tbody>
      </table>
    </ProjectsTableContainer>
  );
};

export default ProjectsTable;
