import { PageListElement } from "./types.ts";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router";
import { useRestApiContext } from "./RestApiContext.tsx";
import { useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

type PageListContextType = {
  getPages: () => Array<PageListElement>;
  addPage: (page: PageListElement) => void;
  isLoaded: boolean;
};

export const PageListContext = createContext<PageListContextType | undefined>(undefined);

export const PageListProvider = (props: Props) => {
  const api = useRestApiContext();
  const location = useLocation();
  const [pages, setPages] = useState<Array<PageListElement>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(false);
    const projectId = location.pathname.split("/")[2];
    api.get(`/api/v1/projects/${projectId}/pages`).then((response) => {
      if (response.status === 200) {
        response.json().then((data: Array<PageListElement>) => {
          setPages(data);
          setIsLoaded(true);
        });
      }
    });
  }, []);
  const getPages = () => {
    return pages;
  };

  const addPage = (page: PageListElement) => {
    setPages([...pages, page]);
  };

  return <PageListContext.Provider value={{ getPages, addPage, isLoaded }}>{props.children}</PageListContext.Provider>;
};

export const PageListContextLayout = () => {
  return (
    <PageListProvider>
      <Outlet />
    </PageListProvider>
  );
};

export const usePageListContext = () => {
  const context = useContext(PageListContext);

  if (context === undefined) {
    throw new Error("usePageListContext must be used within a PageListProvider");
  }

  return context;
};
