import { type Project } from './types.ts';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useRestApiContext } from './RestApiContext.tsx';
import { useToasterContext } from './ToasterContext.tsx';

type Props = {
  children: React.ReactNode;
};

type ProjectsContextType = {
  projects: Project[];
  addProject: (_project: Project) => void;
  editProject: (_project: Project) => void;
  deleteProject: (_projectId: string) => void;
  isLoaded: boolean;
};

export const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = (props: Props) => {
  const api = useRestApiContext();
  const toasterContext = useToasterContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    api.get('/api/v1/projects').then((response) => {
      if (response.status === 200) {
        response.json().then((data: Project[]) => {
          setProjects(data);
          setIsLoaded(true);
        });
      }
    });
  }, []);

  const addProject = async (project: Project) => {
    const response = await api.post('/api/v1/projects', { name: project.name, description: project.description});

    if (response.status !== 200) {
      toasterContext.addToast('Something went wrong!', 'ERROR');
    }

    if (response.status === 200) {
      const responseProject = await response.json();
      setProjects([...projects, responseProject]);
      toasterContext.addToast('Project created successfully!', 'SUCCESS');
    }
  };

  const editProject = async (project: Project) => {
    const response = await api.put(`/api/v1/projects/${project?.id}`, {name: project.name, description: project.description});

    if (response.status !== 200) {
      toasterContext.addToast('Something went wrong!', 'ERROR');
    }

    if (response.status === 200) {
      setProjects(projects.map((p) => (p.id === project.id ? project : p)));
      toasterContext.addToast('Project edited successfully!', 'SUCCESS');
    }

  };

  const deleteProject = (projectId: string) => {
    api.del(`/api/v1/projects/${projectId}`).then((response: Response) => {
      if (response.status === 204) {
        setProjects(projects.filter((project) => project.id !== projectId));
        toasterContext.addToast('Project deleted successfully!', 'SUCCESS');
      } else {
        toasterContext.addToast('Something went wrong!', 'ERROR');
      }
    });
  };

  return <ProjectsContext.Provider value={{ projects, addProject, editProject, deleteProject, isLoaded }}>{props.children}</ProjectsContext.Provider>;
};

export const ProjectsContextLayout = () => {
  return (
    <ProjectsProvider>
      <Outlet />
    </ProjectsProvider>
  );
};

export const useProjectsContext = () => {
  const context = useContext(ProjectsContext);

  if (context === undefined) {
    throw new Error('useProjectsContext must be used within a ProjectsProvider');
  }

  return context;
};
