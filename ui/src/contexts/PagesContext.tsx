import React, { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useRestApiContext } from './RestApiContext.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { Page, type TreeListElement } from '../types.ts';
import { useToasterContext } from './ToasterContext.tsx';

type Props = {
  children: React.ReactNode;
};

type PagesContextType = {
  pages: TreeListElement[];
  fetchPages: () => void;
  isLoaded: boolean;
  page: Page | undefined;
  getPage: (_projectId: string, _pageId: string) => void;
  deletePage: (_projectId: string, _pageId: string) => void;
  createPage: (_projectId: string, _body: object) => void;
  updatePage: (_projectId: string, _pageId: string, _body: object) => void;
};

export const PagesContext = createContext<PagesContextType | undefined>(undefined);

export const PagesProvider = (props: Props) => {
  const api = useRestApiContext();
  const location = useLocation();
  const navigate = useNavigate();
  const toasterContext = useToasterContext();
  const [pages, setPages] = useState<TreeListElement[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [page, setPage] = useState<Page | undefined>(undefined);

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

  const getPage = (projectId: string, pageId: string) => {
    api.get(`/api/v1/projects/${projectId}/pages/${pageId}`).then((response: Response) => {
      if (response.status === 200) {
        response.json().then((data: Page) => {
          setPage(data);
        });
      }
    });
  };

  const deletePage = (projectId: string, pageId: string) => {
    api.del(`/api/v1/projects/${projectId}/pages/${pageId}`).then((response: Response) => {
      if (response.status === 204) {
        setPage(undefined);
        navigate(`/projects/${projectId}/pages`);
        fetchPages();
        toasterContext.addToast('Page deleted successfully!', 'SUCCESS');
      } else {
        toasterContext.addToast('Something went wrong!', 'ERROR');
      }
    });
  };

  const createPage = (projectId: string, body: object) => {
    api.post(`/api/v1/projects/${projectId}/pages`, body).then(async (response:Response) => {
      if (response.status !== 200) {
        toasterContext.addToast('Something went wrong!', 'ERROR');
      }
      if (response.status === 200) {
        fetchPages();
        const data = await response.json();
        navigate(`/projects/${projectId}/pages/${data.id}`);
        toasterContext.addToast('Page created successfully!', 'SUCCESS');
      }
    });
  };

  const updatePage = (projectId: string, pageId: string, body: object) => {
    api.put(`/api/v1/projects/${projectId}/pages/${pageId}`, body).then(async (response:Response) => {
      if (response.status !== 200) {
        toasterContext.addToast('Something went wrong!', 'ERROR');
      }
      if (response.status === 200) {
        fetchPages();
        const data = await response.json();
        navigate(`/projects/${projectId}/pages/${data.id}`);
        toasterContext.addToast('Page updated successfully!', 'SUCCESS');
      }
    });
  };

  return <PagesContext.Provider value={{ pages, fetchPages, isLoaded, page, getPage, deletePage, createPage, updatePage }}>{props.children}</PagesContext.Provider>;
};

export const PagesContextLayout = () => {
  return (
    <PagesProvider>
      <Outlet />
    </PagesProvider>
  );
};

export const usePagesContext = () => {
  const context = useContext(PagesContext);

  if (context === undefined) {
    throw new Error('usePagesContext must be used within a PagesProvider');
  }

  return context;
};
