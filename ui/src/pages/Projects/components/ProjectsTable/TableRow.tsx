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
    <TableRowContainer key={project.id} data-testid="ProjectsTable.table.row">
      <TableCell data-testid="ProjectsTable.table.row.logo">{project.logo}</TableCell>
      <TableCell data-testid="ProjectsTable.table.row.name">
        <Link to={`/projects/${project.id}`} style={{ textDecoration: "none", color: "inherit", fontWeight: "inherit" }}>
          {project.name}
        </Link>
      </TableCell>
      <TableCell data-testid="ProjectsTable.table.row.description">{project.description}</TableCell>
      <TableCell data-testid="ProjectsTable.table.row.actions">
        <IconsContainer>
          <Button iconName="bi-info-circle" onClick={() => navigate(`/projects/${project.id}`)} />
          <Button iconName="bi-pen" onClick={() => {}} />
          <Button iconName="bi-trash" onClick={() => {}} />
        </IconsContainer>
      </TableCell>
    </TableRowContainer>
  );
};

export default TableRow;
