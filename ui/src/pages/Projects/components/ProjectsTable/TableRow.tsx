import Icon from "../../../../components/Icon/Icon.tsx";
import { Project } from "../../types.ts";
import { Link, useNavigate } from "react-router-dom";
import { IconsContainer, TableCell, TableRowContainer } from "../../../../components/styles.ts";
import Button from "../../../../components/Button/Button.tsx";

type TableRowProps = {
  project: Project;
};

const TableRow = (props: TableRowProps) => {
  const { project } = props;
  const navigate = useNavigate();

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
          <Button iconName="bi-info-circle" onClick={() => navigate(`/projects/${project.id}`)} />
          <Icon iconName="bi-pen" />
          <Icon iconName="bi-trash" />
        </IconsContainer>
      </TableCell>
    </TableRowContainer>
  );
};

export default TableRow;
