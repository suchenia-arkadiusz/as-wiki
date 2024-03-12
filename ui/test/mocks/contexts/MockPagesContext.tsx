import { ReactNode, useMemo } from 'react';
import { PagesContext } from '../../../src/contexts/PagesContext.tsx';
import {type Page} from '../../../src/types.ts';

type Props = {
  children: ReactNode;
  page?: Page;
  getPage?: () => void;
  deletePage?: () => void;
  updatePage?: () => void;
  createPage?: () => void;
};

const MockPagesContext = (props: Props) => {
  const {page, getPage, deletePage, updatePage, createPage, children} = props;
  const contextValue = useMemo(() => ({
    pages: [
      {
        id: '1',
        name: 'Page 1',
        isExpanded: false,
        children: [
          {
            id: '2',
            name: 'Page 1.1',
            isExpanded: false,
            children: [],
            parentId: '1'
          },
          {
            id: '3',
            name: 'Page 1.2',
            isExpanded: false,
            children: [
              {
                id: '7',
                name: 'Page 1.2.1',
                isExpanded: false,
                children: [],
                parentId: '1'
              }
            ],
            parentId: '1'
          }
        ]
      },
      {
        id: '4',
        name: 'Page 2',
        isExpanded: false,
        children: [
          {
            id: '5',
            name: 'Page 2.1',
            isExpanded: false,
            children: [],
            parentId: '4'
          },
          {
            id: '6',
            name: 'Page 2.2',
            isExpanded: false,
            children: [],
            parentId: '4'
          }
        ]
      }
    ],
    fetchPages: () => {},
    isLoaded: true,
    page: page ? page : {
      id: '1',
      name: 'Page 1',
      content: 'Test content',
      updatedAt: new Date(2024, 2, 5, 10, 0, 0, 0),
      updatedBy: {
        id: 'user1',
        username: 'user1'
      },
      createdBy: {
        id: 'user2',
        username: 'user2',
        firstName: 'user',
        lastName: '2'
      }
    },
    getPage: getPage ? getPage : () => {},
    deletePage: deletePage ? deletePage :  () => {},
    createPage: createPage ? createPage : () => {},
    updatePage: updatePage ? updatePage : () => {}
  }), []);

  return <PagesContext.Provider value={contextValue}>{children}</PagesContext.Provider>;
};

export default MockPagesContext;
