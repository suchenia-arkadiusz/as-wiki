import { ProjectsContext } from '../../../src/contexts/ProjectsContext.tsx';
import React, { useMemo } from 'react';

const MockProjectsContext = ({ children }: { children: React.ReactNode }) => {
  const contextValue = useMemo(
    () => ({
      getProjects: () => [
        {
          id: '1',
          name: 'asWiki',
          description: 'Description 1',
          color: '#ffaeae'
        },
        {
          id: '2',
          name: 'Some Interesting Project',
          description: 'Description 2',
          color: '#ffffff',
          logoUrl: 'https://t4.ftcdn.net/jpg/02/16/28/19/360_F_216281970_6gotBzdxtFD6vjh7RGmcc4X2JpJz3pr0.jpg'
        },
        {
          id: '3',
          name: 'Project 3',
          description: 'Description 3',
          color: '#97ffa8'
        }
      ],
      addProject: () => {},
      isLoaded: true
    }),
    []
  );

  return <ProjectsContext.Provider value={contextValue}>{children}</ProjectsContext.Provider>;
};

export default MockProjectsContext;
