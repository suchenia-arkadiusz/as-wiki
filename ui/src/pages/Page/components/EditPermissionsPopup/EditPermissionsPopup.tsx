import Popup from '../../../../components/Popup/Popup.tsx';
import { useRestApiContext } from '../../../../contexts/RestApiContext.tsx';
import { useEffect, useState } from 'react';
import { PagePermission, User, UserGroup } from '../../../../contexts/types.ts';
import { useLocation } from 'react-router-dom';
import Icon from '../../../../components/Icon/Icon.tsx';
import styled from 'styled-components';
import Button from '../../../../components/Button/Button.tsx';
import AddPermission from './components/AddPermission/AddPermission.tsx';
import { usePagePermissionsContext } from '../../../../contexts/PagePermissionsContext.tsx';

const PermissionsPopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

const PermissionsTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

type Props = {
  onClose: () => void;
};

const EditPermissionsPopup = (props: Props) => {
  const { onClose } = props;
  const api = useRestApiContext();
  const location = useLocation();
  const { permissions, fetchPermissions, deletePermission} = usePagePermissionsContext();
  const [users, setUsers] = useState<User[]>([]);
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);

  useEffect(() => {
    api.get('/api/v1/users').then((response: Response) => {
      if (response.status === 200) {
        response.json().then((data: User[]) => {
          setUsers(data);
        });
      }
    });

    api.get('/api/v1/user-groups').then((response: Response) => {
      if (response.status === 200) {
        response.json().then((data: UserGroup[]) => {
          setUserGroups(data);
        });
      }
    });

    const projectId = location.pathname.split('/')[2];
    const pageId = location.pathname.split('/')[4];

    fetchPermissions(projectId, pageId);

  }, []);

  const handleDeletePermission = (permission: PagePermission) => {
    const projectId = location.pathname.split('/')[2];
    const pageId = location.pathname.split('/')[4];

    deletePermission(projectId, pageId, permission);
  };

  const getUserFullName = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    return `${user?.firstName} ${user?.lastName}`;
  };

  return (
    <Popup title="Edit permissions" width={800} onClose={onClose}>
      <PermissionsPopupContainer>
        <AddPermission users={users} userGroups={userGroups}/>
        <PermissionsTableContainer>
          <table style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{width: '30px'}}></th>
                <th style={{textAlign: 'left'}}>NAME</th>
                <th style={{ width: '100px', textAlign: 'left'}}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {permissions.permissions
                ? permissions.permissions.map((permission, index) => {
                  return (
                    <tr key={`permission-${index}`}>
                      {permission.userId ? (
                        <>
                          <td>
                            <Icon iconName="bi-person" />
                          </td>
                          <td>{getUserFullName(permission.userId)}</td>
                        </>
                      ) : (
                        <>
                          <td>
                            <Icon iconName="bi-people" />
                          </td>
                          <td>{userGroups.find((userGroup) => userGroup.id === permission.groupId)?.name}</td>
                        </>
                      )}
                      <td>
                        <Button iconName="bi-trash" onClick={() => handleDeletePermission({ permissions: [permission] })} />
                      </td>
                    </tr>
                  );
                })
                : permissions.inheritedPermissions
                  ? permissions.inheritedPermissions.map((permission, index) => {
                    return <tr key={`inherited-permission-${index}`}>
                      {permission.userId
                        ? (<>
                          <td><Icon iconName='bi-person' /></td>
                          <td>
                            {getUserFullName(permission.userId)} Inherited
                          </td>
                        </>
                        )
                        : (<>
                          <td><Icon iconName='bi-people' /></td>
                          <td>{userGroups.find((userGroup) => userGroup.id === permission.groupId)?.name} Inherited</td></>)}
                      <td></td>
                    </tr>;
                  })
                  : null}
            </tbody>
          </table>
        </PermissionsTableContainer>
      </PermissionsPopupContainer>
    </Popup>
  );
};

export default EditPermissionsPopup;
