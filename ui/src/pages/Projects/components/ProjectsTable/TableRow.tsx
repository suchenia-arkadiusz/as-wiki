import Icon from "../../../../components/Icon/Icon.tsx";
import { Project } from "../../types.ts";
import { Link } from "react-router-dom";
import { IconsContainer, TableCell, TableRowContainer } from "../../../../components/styles.ts";

type TableRowProps = {
  project: Project;
};

const TableRow = (props: TableRowProps) => {
  const { project } = props;

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
        <IconsContainer>
          <Link to={`/projects/${project.id}`} style={{ textDecoration: "none", color: "inherit", fontWeight: "inherit" }}>
            <Icon iconName="InfoCircle" />
          </Link>
          <Icon iconName="Pen" />
          <Icon iconName="Trash" />
        </IconsContainer>
      </TableCell>
    </TableRowContainer>
  );
};

export default TableRow;
