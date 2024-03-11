import { render } from '@testing-library/react';
import MockPagePermissionsContext from '../../../../mocks/contexts/MockPagePermissionsContext.tsx';
import EditPermissionsPopup from '../../../../../src/pages/Page/components/EditPermissionsPopup/EditPermissionsPopup.tsx';
import MockBrowser from '../../../../mocks/MockBrowser.tsx';
import { PagePermission } from '../../../../../src/contexts/types.ts';
import { expect, vi } from 'vitest';

const fetchPermissions = vi.fn();
const deletePermissions = vi.fn();

const setupScreen = (permissions: PagePermission | undefined = undefined, onClose: () => void = () => {}) => {
  return render(
    <MockBrowser>
      <MockPagePermissionsContext permissions={permissions} fetchPermissions={fetchPermissions} deletePermission={deletePermissions}>
        <EditPermissionsPopup onClose={onClose} />
      </MockPagePermissionsContext>
    </MockBrowser>
  );
};

describe('<EditPermissionsPopup />', () => {
  it('should render the component', () => {
    const screen = setupScreen();

    expect(screen.getByText('EDIT PERMISSIONS')).toBeInTheDocument();
    expect(screen.getByTestId('EditPermissions.container')).toBeInTheDocument();
    expect(screen.queryByTestId('EditPermissions.permissions.table')).not.toBeInTheDocument();
    expect(screen.getByTestId('AddPermission.container')).toBeInTheDocument();
    expect(screen.getByTestId('AddPermission.search.container')).toBeInTheDocument();
    expect(screen.getByTestId('AddPermission.button.add')).toBeInTheDocument();
  });

  it('should render the permissions table when the permissions are fetched', () => {
    const permissions = {
      permissions: [
        {
          pageId: '1',
          userId: 'user1',
          groupId: undefined
        }
      ]
    };
    const screen = setupScreen(permissions);

    expect(screen.getByText('EDIT PERMISSIONS')).toBeInTheDocument();
    expect(screen.getByTestId('EditPermissions.container')).toBeInTheDocument();
    expect(screen.getByTestId('EditPermissions.permissions.table')).toBeInTheDocument();
    expect(screen.getByTestId('AddPermission.container')).toBeInTheDocument();
    expect(screen.getByTestId('AddPermission.search.container')).toBeInTheDocument();
    expect(screen.getByTestId('AddPermission.button.add')).toBeInTheDocument();
    expect(screen.getByTestId('EditPermissions.permissions.table.row-0')).toBeInTheDocument();
    expect(screen.getByTestId('EditPermissions.permissions.button.delete-0')).toBeInTheDocument();
  });

  it('should render the permissions table when the inherited permissions are fetched', () => {
    const permissions = {
      inheritedPermissions: [
        {
          pageId: '1',
          userId: 'user1',
          groupId: undefined
        }
      ]
    };
    const screen = setupScreen(permissions);

    expect(screen.getByText('EDIT PERMISSIONS')).toBeInTheDocument();
    expect(screen.getByTestId('EditPermissions.container')).toBeInTheDocument();
    expect(screen.getByTestId('EditPermissions.permissions.table')).toBeInTheDocument();
    expect(screen.getByTestId('AddPermission.container')).toBeInTheDocument();
    expect(screen.getByTestId('AddPermission.search.container')).toBeInTheDocument();
    expect(screen.getByTestId('AddPermission.button.add')).toBeInTheDocument();
    expect(screen.getByTestId('EditPermissions.permissions.table.row-0')).toBeInTheDocument();
    expect(screen.queryByTestId('EditPermissions.permissions.button.delete-0')).not.toBeInTheDocument();
    expect(screen.getByText('Inherited')).toBeInTheDocument();
  });

  it('should call the "onClose" function when the "Close" button is clicked', () => {
    const onClose = vi.fn();
    const screen = setupScreen(undefined, onClose);

    screen.getByTestId('Popup.close.button').click();

    expect(onClose).toHaveBeenCalled();
  });

  it('should call the "fetchPermissions function when the component is mounted', () => {
    setupScreen();

    expect(fetchPermissions).toHaveBeenCalled();
  });

  it('should call the "deletePermission" function when the "Delete" button is clicked', () => {
    const permissions = {
      permissions: [
        {
          pageId: '1',
          userId: 'user1',
          groupId: undefined
        }
      ]
    };
    const screen = setupScreen(permissions);

    screen.getByTestId('EditPermissions.permissions.button.delete-0').click();

    expect(deletePermissions).toHaveBeenCalled();
  });

  it('should render the "user" icon when the permission is for a user', () => {
    const permissions = {
      permissions: [
        {
          pageId: '1',
          userId: 'user1',
          groupId: undefined
        }
      ]
    };
    const screen = setupScreen(permissions);

    expect(screen.getByTestId('EditPermissions.user.icon')).toBeInTheDocument();
    expect(screen.getByTestId('EditPermissions.user.icon')).toHaveClass('bi-person');
  });

  it('should render the "group" icon when the permission is for a user', () => {
    const permissions = {
      permissions: [
        {
          pageId: '1',
          userId: undefined,
          groupId: 'group1'
        }
      ]
    };
    const screen = setupScreen(permissions);

    expect(screen.getByTestId('EditPermissions.group.icon')).toBeInTheDocument();
    expect(screen.getByTestId('EditPermissions.group.icon')).toHaveClass('bi-people');
  });
});
