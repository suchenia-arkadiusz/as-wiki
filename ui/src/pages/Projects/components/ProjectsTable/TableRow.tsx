import { type Project } from '../../types.ts';
import { Link, useNavigate } from 'react-router-dom';
import { IconsContainer, TableCell, TableRowContainer } from '../../../../components/styles.ts';
import Button from '../../../../components/Button/Button.tsx';
import { useProjectsContext } from '../../../../contexts/ProjectsContext.tsx';

type Props = {
  project: Project;
  openPopup: (_isEdit: boolean, _selectedProject: Project | undefined) => void;
};

const TableRow = (props: Props) => {
  const projectsContext = useProjectsContext();
  const { project, openPopup } = props;
  const navigate = useNavigate();

  const deleteProject = () => {
    projectsContext.deleteProject(project.id);
  };

  return (
    <TableRowContainer key={project.id} data-testid="ProjectsTable.table.row">
      <TableCell data-testid="ProjectsTable.table.row.logo">{project.logo}</TableCell>
      <TableCell data-testid="ProjectsTable.table.row.name">
        <Link to={`/projects/${project.id}/pages`} style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'inherit' }}>
          {project.name}
        </Link>
      </TableCell>
      <TableCell data-testid="ProjectsTable.table.row.description">{project.shortDescription}</TableCell>
      <TableCell data-testid="ProjectsTable.table.row.actions">
        <IconsContainer>
          <Button iconName="bi-info-circle" onClick={() => { navigate(`/projects/${project.id}`); }} />
          <Button iconName="bi-pen" onClick={() => openPopup(true, project)} />
          <Button iconName="bi-trash" onClick={deleteProject} />
        </IconsContainer>
      </TableCell>
    </TableRowContainer>
  );
};

export default TableRow;
