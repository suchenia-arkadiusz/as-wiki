import TableLoader from '../../../../src/components/Loader/TableLoader/TableLoader.tsx';
import { render } from '@testing-library/react';
import { expect } from 'vitest';

const setupScreen = () => {
  return render(
    <table>
      <tbody>
        <TableLoader numOfRows={2} numOfColumns={5} />
      </tbody>
    </table>
  );
};

describe('<TableLoader />', () => {
  it('should render TableLoaderContainer', () => {
    const screen = setupScreen();
    expect(screen.getAllByTestId('TableLoaderRowContainer')).toHaveLength(2);
    expect(screen.getAllByTestId('TableLoaderCellContainer')).toHaveLength(10);
  });

  it('should render 10 elements of <Loader />', () => {
    const screen = setupScreen();
    expect(screen.getAllByTestId('LoaderContainer')).toHaveLength(10);
  });
});
