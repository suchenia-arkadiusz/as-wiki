import { type Project } from './types.ts';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useRestApiContext } from './RestApiContext.tsx';

type Props = {
  children: React.ReactNode;
};

type ProjectsContextType = {
  projects: Project[];
  addProject: (_project: Project) => void;
  isLoaded: boolean;
};

export const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = (props: Props) => {
  const api = useRestApiContext();
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

  const addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  return <ProjectsContext.Provider value={{ projects, addProject, isLoaded }}>{props.children}</ProjectsContext.Provider>;
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
