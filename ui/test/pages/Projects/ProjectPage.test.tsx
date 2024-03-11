import ProjectPage from '../../../src/pages/Projects/ProjectPage.tsx';
import MockBrowser from '../../mocks/MockBrowser.tsx';
import { render, waitFor } from '@testing-library/react';
import { expect, vi } from 'vitest';

const apiHandler = {
  get: vi.fn(() => Promise.resolve(new Response(JSON.stringify({
    id: '1',
    name: 'Test Project',
    description: 'Test Description',
    numberOfPages: 10
  }), {status: 200}))),
  post: vi.fn(),
  put: vi.fn(),
  del: vi.fn()
};

const setupScreen = () => {
  return render(
    <MockBrowser api={apiHandler}>
      <ProjectPage />
    </MockBrowser>
  );
};

describe('<ProjectPage />', () => {
  it('should render the page', async () => {
    const screen = setupScreen();

    expect(apiHandler.get).toHaveBeenCalledWith(expect.stringMatching(/\/api\/v1\/projects\/.*/));
    await waitFor(() => {
      expect(screen.getByTestId('ProjectPage.container')).toBeInTheDocument();
    });
    expect(screen.getByText('TEST PROJECT')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
