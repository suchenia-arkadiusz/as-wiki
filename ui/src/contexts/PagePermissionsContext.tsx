import { createContext, ReactNode, useContext, useState } from 'react';
import { PagePermission } from './types.ts';
import { useRestApiContext } from './RestApiContext.tsx';
import { useToasterContext } from './ToasterContext.tsx';

type Props = {
  children: ReactNode;
};

type PagePermissionsContextType = {
  permissions: PagePermission;
  fetchPermissions: (_projectId: string, _pageId: string) => void;
  addPermission: (_projectId: string, _pageId: string, _permission: PagePermission) => void;
  deletePermission: (_projectId: string, _pageId: string, _permission: PagePermission) => void;
};

export const PagePermissionsContext = createContext<PagePermissionsContextType | undefined>(undefined);

export const PagePermissionsProvider = (props: Props) => {
  const api = useRestApiContext();
  const toaster = useToasterContext();
  const [permissions, setPermissions] = useState<PagePermission>({});

  const fetchPermissions = (projectId: string, pageId: string) => {
    api.get(`/api/v1/projects/${projectId}/pages/${pageId}/permissions`).then((response: Response) => {
      if (response.status === 200) {
        response.json().then((data: PagePermission) => {
          setPermissions(data);
        });
      }
    });
  };

  const addPermission = (projectId: string, pageId: string, permission: PagePermission) => {
    api.post(`/api/v1/projects/${projectId}/pages/${pageId}/permissions`, {
      pageId,
      userId: permission.permissions ? permission.permissions[0].userId : undefined,
      groupId: permission.permissions ? permission.permissions[0]?.groupId : undefined,
    }).then((response: Response) => {
      if (response.status === 200) {
        toaster.addToast('Permission added', 'SUCCESS');
        fetchPermissions(projectId, pageId);
      } else if (response.status === 409) {
        toaster.addToast('Permission already exists', 'DANGER');
      } else {
        toaster.addToast('Something went wrong!', 'ERROR');
      }
    });
  };

  const deletePermission = (projectId: string, pageId: string, permission: PagePermission) => {
    api.del(`/api/v1/projects/${projectId}/pages/${pageId}/permissions`, permission.permissions ? permission.permissions[0] : {}).then((response: Response) => {
      if (response.status === 200) {
        toaster.addToast('Permission deleted', 'SUCCESS');
        fetchPermissions(projectId, pageId);
      }
    });
  };

  return <PagePermissionsContext.Provider value={{permissions, fetchPermissions, addPermission, deletePermission}}>{props.children}</PagePermissionsContext.Provider>;
};

export const usePagePermissionsContext = () => {
  const context = useContext(PagePermissionsContext);

  if (context === undefined) {
    throw new Error('usePagePermissionsContext must be used within a PagePermissionsProvider');
  }

  return context;
};
