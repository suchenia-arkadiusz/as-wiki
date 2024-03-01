import Search, { DataType } from '../../../../../../components/Search/Search.tsx';
import Button from '../../../../../../components/Button/Button.tsx';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { User, UserGroup } from '../../../../../../contexts/types.ts';
import { useLocation } from 'react-router-dom';
import { usePagePermissionsContext } from '../../../../../../contexts/PagePermissionsContext.tsx';

const AddPermissionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

type Props = {
  users: Array<User>;
  userGroups: Array<UserGroup>;
};

const AddPermission = (props: Props) => {
  const { users, userGroups } = props;
  const location = useLocation();
  const { addPermission} = usePagePermissionsContext();
  const [data, setData] = useState<Array<DataType>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selected, setSelected] = useState<DataType | undefined>(undefined);

  useEffect(() => {
    const filteredUsers = users
      .filter((user) =>
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase())
      || user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
      || user.username?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((user) => ({
        key: user.id,
        value:
          user.firstName || user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.username
      }));
    const filteredUserGroups = userGroups
      .filter((userGroup) => userGroup.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map((userGroup) => ({
        key: userGroup.id,
        value: userGroup.name,
      }));

    if (searchTerm && searchTerm.length > 0) setData([...filteredUsers, ...filteredUserGroups]);
    else setData([]);
  }, [searchTerm]);

  useEffect(() => {
    setData([]);
  }, [selected]);

  const handleAddPermission = () => {
    if (!selected) return;
    const pageId = location.pathname.split('/')[4];
    const projectId = location.pathname.split('/')[2];

    const foundUser = users.find((user) => user.id === selected.key);
    const permission = [];
    if (foundUser) {
      permission.push({
        pageId,
        userId: selected.key,
        groupId: undefined,
      });
    } else {
      permission.push({
        pageId,
        userId: undefined,
        groupId: selected.key,
      });
    }

    addPermission(projectId, pageId, {permissions: permission});

    setSelected(undefined);
  };

  return (
    <AddPermissionContainer>
      <Search onChange={setSearchTerm} data={data} onSelect={setSelected}/>
      <Button onClick={handleAddPermission} text="Add" iconName='bi-plus-lg'/>
    </AddPermissionContainer>);
};

export default AddPermission;
