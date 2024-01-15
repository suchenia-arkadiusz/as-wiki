import { TProject } from "./types.ts";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useRestApiContext } from "./RestApiContext.tsx";

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
  const api = useRestApiContext();
  const [projects, setProjects] = useState<Array<TProject>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    api.get("/api/v1/projects").then((response) => {
      if (response.status === 200) {
        response.json().then((data: Array<TProject>) => {
          setProjects(data);
          setIsLoaded(true);
        });
      }
    });
  }, []);

  const getProjects = (): Array<TProject> => projects;

  const addProject = (project: TProject) => {
    setProjects([...projects, project]);
  };

  return <ProjectsContext.Provider value={{ getProjects, addProject, isLoaded }}>{props.children}</ProjectsContext.Provider>;
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
