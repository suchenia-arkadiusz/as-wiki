import { ReactNode, useMemo } from "react";
import { PagesContext } from "../../../src/contexts/PagesContext.tsx";
import { useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
  withPage?: boolean;
};


const MockPagesContext = (props: Props) => {
  const {withPage = true, children} = props;
  const location = useLocation();
  console.log(location.pathname)
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
    page: withPage ? {
      id: '1',
      name: 'Page 1',
      content: 'Some content',
      updatedAt: new Date(),
      updatedBy: {
        id: 'user1',
        username: 'user1'
      },
      createdBy: {
        id: 'user2',
        username: 'user2'
      }
    } : undefined,
    getPage: () => {},
    deletePage: () => {},
    createPage: () => {},
    updatePage: () => {}
  }), []);

  return <PagesContext.Provider value={contextValue}>{children}</PagesContext.Provider>;
}

export default MockPagesContext
