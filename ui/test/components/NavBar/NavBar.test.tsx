import { NavBar } from '../../../src/components/NavBar/NavBar.tsx';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import MockBrowser from '../../mocks/MockBrowser.tsx';
import { expect, vi } from 'vitest';

const apiHandler = {
  get: vi.fn((url: string) => {
    let body;
    if (url === '/api/v1/pages/search?searchTerm=test') body = [
      {
        id: '1',
        name: 'Test page',
        projectId: '2',
      },
    ];

    return Promise.resolve(
      new Response(
        JSON.stringify(body),
        { status: 200 }));
  }),
  post: vi.fn(),
  put: vi.fn(),
  del: vi.fn(),
};

const setupScreen = () => {
  return render(
    <MockBrowser api={apiHandler}>
      <NavBar />
    </MockBrowser>
  );
};

describe('<NavBar />', () => {
  it('should render NavBarContainer', () => {
    const screen = setupScreen();
    expect(screen.getByTestId('NavBar.container')).toBeInTheDocument();
    expect(screen.getByTestId('UserAvatar.container')).toBeInTheDocument();
    expect(screen.getByTestId('UserAvatar.button.avatar')).toBeInTheDocument();
    expect(screen.getByTestId('NavBar.button.projects')).toBeInTheDocument();
    expect(screen.getByTestId('NavBar.search.container')).toBeInTheDocument();
  });

  it('should contain app name', () => {
    const screen = setupScreen();
    expect(screen.getByText('asWiki')).toBeInTheDocument();
  });

  it('should contain user name', () => {
    const screen = setupScreen();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('should contain user avatar', () => {
    const screen = setupScreen();
    expect(screen.getByAltText('User\'s avatar')).toBeInTheDocument();
  });

  it('should find pages and display them', async () => {
    const screen = setupScreen();

    act(() =>
      fireEvent.change(screen.getByTestId('NavBar.search.input.input'), { target: { value: 'test' } })
    );

    expect(apiHandler.get).toHaveBeenCalledWith('/api/v1/pages/search?searchTerm=test');
    await waitFor(() =>
      expect(screen.getByTestId('NavBar.search.data.element-1')).toBeInTheDocument()
    );
  });

  it('should disappear the page results when search term is empty', async () => {
    const screen = setupScreen();

    act(() =>
      fireEvent.change(screen.getByTestId('NavBar.search.input.input'), { target: { value: 'test' } })
    );

    expect(apiHandler.get).toHaveBeenCalledWith('/api/v1/pages/search?searchTerm=test');
    await waitFor(() =>
      expect(screen.getByTestId('NavBar.search.data.element-1')).toBeInTheDocument()
    );

    act(() =>
      fireEvent.change(screen.getByTestId('NavBar.search.input.input'), { target: { value: '' } })
    );

    await waitFor(() =>
      expect(screen.queryByTestId('NavBar.search.data.element-1')).not.toBeInTheDocument()
    );
  });

  it('should close the page result when the overlay is clicked', async () => {
    const screen = setupScreen();

    act(() =>
      fireEvent.change(screen.getByTestId('NavBar.search.input.input'), { target: { value: 'test' } })
    );

    expect(apiHandler.get).toHaveBeenCalledWith('/api/v1/pages/search?searchTerm=test');
    await waitFor(() =>
      expect(screen.getByTestId('NavBar.search.data.element-1')).toBeInTheDocument()
    );

    act(() =>
      screen.getByTestId('NavBar.search.data.overlay').click()
    );

    await waitFor(() =>
      expect(screen.queryByTestId('NavBar.search.data.element-1')).not.toBeInTheDocument()
    );
  });

  it('should close the page result when the page was selected', async () => {
    const screen = setupScreen();

    act(() =>
      fireEvent.change(screen.getByTestId('NavBar.search.input.input'), { target: { value: 'test' } })
    );

    expect(apiHandler.get).toHaveBeenCalledWith('/api/v1/pages/search?searchTerm=test');
    await waitFor(() =>
      expect(screen.getByTestId('NavBar.search.data.element-1')).toBeInTheDocument()
    );

    act(() =>
      screen.getByTestId('NavBar.search.data.element-1').click()
    );

    await waitFor(() =>
      expect(screen.queryByTestId('NavBar.search.data.element-1')).not.toBeInTheDocument()
    );
  });
});
