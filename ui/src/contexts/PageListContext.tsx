import React, { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useRestApiContext } from './RestApiContext.tsx';
import { useLocation } from 'react-router-dom';
import { type TreeListElement } from '../types.ts';

type Props = {
  children: React.ReactNode;
};

type PageListContextType = {
  pages: TreeListElement[];
  fetchPages: () => void;
  isLoaded: boolean;
};

export const PageListContext = createContext<PageListContextType | undefined>(undefined);

export const PageListProvider = (props: Props) => {
  const api = useRestApiContext();
  const location = useLocation();
  const [pages, setPages] = useState<TreeListElement[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = () => {
    setIsLoaded(false);
    const projectId = location.pathname.split('/')[2];
    api.get(`/api/v1/projects/${projectId}/pages`).then((response) => {
      if (response.status === 200) {
        response.json().then((data: TreeListElement[]) => {
          setPages(data);
          setIsLoaded(true);
        });
      }
    });
  };

  return <PageListContext.Provider value={{ pages, fetchPages, isLoaded }}>{props.children}</PageListContext.Provider>;
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
    throw new Error('usePageListContext must be used within a PageListProvider');
  }

  return context;
};
