import MockBrowser from '../../../../../mocks/MockBrowser.tsx';
import AddPermission from '../../../../../../src/pages/Page/components/EditPermissionsPopup/components/AddPermission/AddPermission.tsx';
import { mockedGroups, mockedUsers } from './mockAddPermissionData.ts';
import { act, fireEvent, render } from '@testing-library/react';
import MockPagePermissionsContext from '../../../../../mocks/contexts/MockPagePermissionsContext.tsx';
import { expect, vi } from 'vitest';

const addPermission = vi.fn();

const setupScreen = () => {
  return render(
    <MockBrowser>
      <MockPagePermissionsContext addPermission={addPermission}>
        <AddPermission users={mockedUsers} userGroups={mockedGroups} />;
      </MockPagePermissionsContext>
    </MockBrowser>
  );
};

describe('<AddPermission />', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the component', () => {
    const screen = setupScreen();

    expect(screen.getByTestId('AddPermission.container')).toBeInTheDocument();
    expect(screen.getByTestId('AddPermission.search.container')).toBeInTheDocument();
    expect(screen.getByTestId('AddPermission.button.add')).toBeInTheDocument();
    expect(screen.getByTestId('AddPermission.search.input')).toBeInTheDocument();
  });

  it('should call the "addPermission" function when the user permission is added', () => {
    const screen = setupScreen();

    fireEvent.change(screen.getByTestId('AddPermission.search.input.input'), { target: { value: 'user' } });
    act(() => screen.getByTestId('AddPermission.search.data.element-1').click());
    act(() => {
      screen.getByTestId('AddPermission.button.add').click();
    });

    expect(addPermission).toHaveBeenCalled();
  });

  it('should call the "addPermission" function when the user group permission is added', () => {
    const screen = setupScreen();

    fireEvent.change(screen.getByTestId('AddPermission.search.input.input'), { target: { value: 'group' } });
    act(() => screen.getByTestId('AddPermission.search.data.element-3').click());
    act(() => {
      screen.getByTestId('AddPermission.button.add').click();
    });

    expect(addPermission).toHaveBeenCalled();
  });

  it('should not coll the "addPermission" function when the permission is not selected', () => {
    const screen = setupScreen();

    screen.getByTestId('AddPermission.button.add').click();

    expect(addPermission).not.toHaveBeenCalled();
  });
});
