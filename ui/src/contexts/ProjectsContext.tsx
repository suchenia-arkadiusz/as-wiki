import { TProject } from "./types.ts";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Outlet } from "react-router";

type Props = {
  children: React.ReactNode;
};

type ProjectsContextType = {
  getProjects: () => Array<TProject>;
  addProject: (project: TProject) => void;
  isLoaded: boolean;
};

export const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = (props: Props) => {
  const [projects, setProjects] = useState<Array<TProject>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    // TODO: Fetch projects from API
    setIsLoaded(true);
  }, []);

  const getProjects = (): Array<TProject> => projects;

  const addProject = (project: TProject) => {
    setProjects([...projects, project]);
  };

  const contextValue = useMemo(() => ({ getProjects, addProject, isLoaded }), []);

  return <ProjectsContext.Provider value={contextValue}>{props.children}</ProjectsContext.Provider>;
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
    throw new Error("useProjectsContext must be used within a ProjectsProvider");
  }

  return context;
};
