import DocumentPage from '../../../src/pages/Page/DocumentPage.tsx';
import MockBrowser from '../../mocks/MockBrowser.tsx';
import { act, render } from '@testing-library/react';
import MockPagesContext from '../../mocks/contexts/MockPagesContext.tsx';
import {expect, vi} from 'vitest';
import {type Page} from '../../../src/types.ts';

const setupScreen = (page?: Page = undefined, deletePage?: () => void, getPage?: () => void) => {
  return render(
    <MockBrowser>
      <MockPagesContext page={page} deletePage={deletePage} getPage={getPage}>
        <DocumentPage />
      </MockPagesContext>
    </MockBrowser>
  );
};

describe('<DocumentPage />', () => {
  it('should render the component', () => {
    const screen = setupScreen();

    expect(screen.getByTestId('DocumentPage.container')).toBeInTheDocument();
    expect(screen.getByTestId('DocumentPage.pageContent.container.page')).toBeInTheDocument();
    expect(screen.getByTestId('PageListPanel.container')).toBeInTheDocument();
    expect(screen.getByTestId('PageListPanel.addPage.button')).toBeInTheDocument();
    expect(screen.getByTestId('PageListPanel.list-0')).toBeInTheDocument();
    expect(screen.getByTestId('DocumentPage.editPermissions.button')).toBeInTheDocument();
    expect(screen.getByTestId('DocumentPage.editPage.button')).toBeInTheDocument();
    expect(screen.getByTestId('DocumentPage.deletePage.button')).toBeInTheDocument();
    expect(screen.queryByTestId('DocumentPage.pageContent.container.accessDenied')).not.toBeInTheDocument();
  });

  it('should render the "Access Denied" page when the page id is "access-denied"', () => {
    const page = {
      id: 'access-denied',
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
    };
    const screen = setupScreen(page);

    expect(screen.getByTestId('DocumentPage.container')).toBeInTheDocument();
    expect(screen.getByTestId('DocumentPage.pageContent.container.accessDenied')).toBeInTheDocument();
    expect(screen.getByTestId('PageListPanel.container')).toBeInTheDocument();
    expect(screen.getByTestId('PageListPanel.addPage.button')).toBeInTheDocument();
    expect(screen.getByTestId('PageListPanel.list-0')).toBeInTheDocument();
    expect(screen.queryByTestId('DocumentPage.pageContent.container.page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('DocumentPage.editPermissions.button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('DocumentPage.editPage.button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('DocumentPage.deletePage.button')).not.toBeInTheDocument();
  });

  it('should load page content when a page is selected', () => {
    const screen = setupScreen();

    expect(screen.getByText('Page 1')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
    expect(screen.getByText('Created by user 2, last updated at 2024-03-05 10:00:00 by user1'));
  });

  it('should open the "Add Page" dialog when the "Add Page" button is clicked', () => {
    const screen = setupScreen();

    act(() =>
      screen.getByTestId('PageListPanel.addPage.button').click()
    );

    expect(screen.getByTestId('CreatePage.container')).toBeInTheDocument();
    expect(screen.getByTestId('CreatePage.name.input')).toHaveAttribute('value', '');
  });

  it('should close the "Add Page" dialog when the "Close" button is clicked', () => {
    const screen = setupScreen();

    act(() =>
      screen.getByTestId('PageListPanel.addPage.button').click()
    );
    act(() =>
      screen.getByTestId('Popup.close.button').click()
    );

    expect(screen.queryByTestId('CreatePage.container')).not.toBeInTheDocument();
  });

  it('should open the "Edit Page" dialog when the "Edit Page" button is clicked', () => {
    const screen = setupScreen();

    act(() =>
      screen.getByTestId('DocumentPage.editPage.button').click()
    );

    expect(screen.getByTestId('CreatePage.container')).toBeInTheDocument();
    expect(screen.getByTestId('CreatePage.name.input')).toHaveAttribute('value', 'Page 1');
  });

  it('should close the "Edit Page" dialog when the "Close" button is clicked', () => {
    const screen = setupScreen();

    act(() =>
      screen.getByTestId('DocumentPage.editPage.button').click()
    );
    act(() =>
      screen.getByTestId('Popup.close.button').click()
    );

    expect(screen.queryByTestId('CreatePage.container')).not.toBeInTheDocument();
  });

  it('should open the "Edit Permissions" dialog when the "Edit Permissions" button is clicked', () => {
    const screen = setupScreen();

    act(() =>
      screen.getByTestId('DocumentPage.editPermissions.button').click()
    );

    expect(screen.getByTestId('EditPermissions.container')).toBeInTheDocument();
  });

  it('should close the "Edit Permissions" dialog when the "Close" button is clicked', () => {
    const screen = setupScreen();

    act(() =>
      screen.getByTestId('DocumentPage.editPermissions.button').click()
    );
    act(() =>
      screen.getByTestId('Popup.close.button').click()
    );

    expect(screen.queryByTestId('EditPermissions.container')).not.toBeInTheDocument();
  });

  it('should call the "deletePage" function when the "Delete Page" button is clicked', () => {
    const deletePage = vi.fn();
    const screen = setupScreen(undefined, deletePage);

    act(() =>
      screen.getByTestId('DocumentPage.deletePage.button').click()
    );

    expect(deletePage).toHaveBeenCalled();
  });

  it('should call the "getPage" function when a page is selected', () => {
    const getPage = vi.fn();
    const screen = setupScreen(undefined, undefined, getPage);

    act(() =>
      screen.getByTestId('PageListPanel.list.item.button-1').click()
    );

    expect(getPage).toHaveBeenCalled();
  });
});
