import { ReactNode, useMemo } from 'react';
import { PagePermissionsContext } from '../../../src/contexts/PagePermissionsContext.tsx';
import { PagePermission } from '../../../src/contexts/types.ts';

type Props = {
  children: ReactNode;
  permissions?: PagePermission;
  fetchPermissions?: (_projectId: string, _pageId: string) => void;
  addPermission?: (_projectId: string, _pageId: string, _permission: PagePermission) => void;
  deletePermission?: (_projectId: string, _pageId: string, _permission: PagePermission) => void;
};

const MockPagePermissionsContext = (props: Props) => {
  const {children, permissions, fetchPermissions, deletePermission, addPermission } = props;

  const contextValue = useMemo(() => ({
    permissions: permissions ? permissions : {},
    fetchPermissions: fetchPermissions ? fetchPermissions : () => {},
    addPermission: addPermission ? addPermission : () => {},
    deletePermission: deletePermission ? deletePermission : () => {}
  }), []);

  return <PagePermissionsContext.Provider value={contextValue}>{children}</PagePermissionsContext.Provider>;
};

export default MockPagePermissionsContext;
