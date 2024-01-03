import { TProject } from "./types.ts";
import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router";

type ProjectsContextProps = {
  children: React.ReactNode;
};

type TProjectsContext = {
  getProjects: () => Array<TProject>;
  addProject: (project: TProject) => void;
  isLoaded: boolean;
};

export const ProjectsProvider = (props: ProjectsContextProps) => {
  const [projects, setProjects] = useState<Array<TProject>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    setProjects(mockProjects);
    setIsLoaded(true);
  }, []);

  const getProjects = (): Array<TProject> => projects;

  const addProject = (project: TProject) => {
    setProjects([...projects, project]);
  };

  return <ProjectsContext.Provider value={{ getProjects, addProject, isLoaded }}>{props.children}</ProjectsContext.Provider>;
};

export const ProjectsContext = createContext<TProjectsContext | undefined>(undefined);

export const ProjectsContextLayout = () => {
  return (
    <ProjectsProvider>
      <Outlet />
    </ProjectsProvider>
  );
};

const mockProjects: Array<TProject> = [
  {
    id: "1",
    name: "asWiki",
    description: "Description 1",
    color: "#ffaeae",
  },
  {
    id: "2",
    name: "Some Interesting Project",
    description: "Description 2",
    color: "#ffffff",
    logoUrl: "https://t4.ftcdn.net/jpg/02/16/28/19/360_F_216281970_6gotBzdxtFD6vjh7RGmcc4X2JpJz3pr0.jpg",
  },
  {
    id: "3",
    name: "Project 3",
    description: "Description 3",
    color: "#97ffa8",
  },
];
