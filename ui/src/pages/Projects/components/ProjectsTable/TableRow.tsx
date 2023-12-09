import Icon from "../../../../components/Icon/Icon.tsx";
import styled from "styled-components";
import { Project } from "../../types.ts";
import { Link } from "react-router-dom";

const TableRowContainer = styled.tr`
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

type TableRowProps = {
  project: Project;
};

const TableRow = (props: TableRowProps) => {
  const { project } = props;

  const handleIconClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    alert("Icon clicked");
  };

  return (
    <TableRowContainer key={project.id}>
      <TableCell>{project.logo}</TableCell>
      <TableCell>
        <Link to={`/projects/${project.id}`} style={{ textDecoration: "none", color: "inherit", fontWeight: "inherit" }}>
          {project.name}
        </Link>
      </TableCell>
      <TableCell>{project.description}</TableCell>
      <TableCell>
        <IconsContainer onClick={(e) => handleIconClick(e)}>
          <Icon iconName="Pen" />
          <Icon iconName="Trash" />
        </IconsContainer>
      </TableCell>
    </TableRowContainer>
  );
};

export default TableRow;
