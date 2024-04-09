import { TreeListElement } from '../../../src/types.ts';
import { expect, vi } from 'vitest';
import TreeList from '../../../src/components/TreeList/TreeList.tsx';
import { act, render } from '@testing-library/react';
import { mockTreeListData } from './mockTreeListData.ts';

const onSelect = vi.fn();

const setupScreen = (data: Array<TreeListElement>, selectedDataElementId: string = '') => {
  return render(<TreeList
    data={data}
    selectedDataElementId={selectedDataElementId}
    onSelect={onSelect}
  />);
};

describe('<TreeList />', () => {
  it('should render TreeList container', () => {
    const screen = setupScreen([]);

    expect(screen.getByTestId('TreeList.container-0')).toBeInTheDocument();
  });

  it('should render TreeList item container component', () => {
    const screen = setupScreen(mockTreeListData);

    expect(screen.getByTestId('TreeList.item.container-1')).toBeInTheDocument();
    expect(screen.queryByTestId('TreeList.item.container-2')).not.toBeInTheDocument();
    expect(screen.getByTestId('TreeList.item.container-4')).toBeInTheDocument();
  });

  it('should call onSelect when data element is clicked', () => {
    const screen = setupScreen(mockTreeListData);
    screen.getByText('Page 1').click();

    expect(onSelect).toHaveBeenCalledWith('1');
    expect(onSelect).toHaveBeenCalled();
  });

  it('should expand the TreeList when the expand button is clicked', () => {
    const screen = setupScreen(mockTreeListData);

    expect(screen.getByTestId('TreeList.item.container-1')).toBeInTheDocument();
    expect(screen.queryByTestId('TreeList.item.container-2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('TreeList.item.container-3')).not.toBeInTheDocument();
    expect(screen.getByTestId('TreeList.item.container-4')).toBeInTheDocument();
    expect(screen.queryByTestId('TreeList.item.container-5')).not.toBeInTheDocument();
    expect(screen.queryByTestId('TreeList.item.container-6')).not.toBeInTheDocument();
    expect(screen.queryByTestId('TreeList.item.container-7')).not.toBeInTheDocument();

    act(() => {screen.getByTestId('TreeList.item.expand-1').click();});

    expect(screen.getByTestId('TreeList.item.container-1')).toBeInTheDocument();
    expect(screen.getByTestId('TreeList.item.container-2')).toBeInTheDocument();
    expect(screen.getByTestId('TreeList.item.container-3')).toBeInTheDocument();
    expect(screen.getByTestId('TreeList.item.container-4')).toBeInTheDocument();
    expect(screen.queryByTestId('TreeList.item.container-5')).not.toBeInTheDocument();
    expect(screen.queryByTestId('TreeList.item.container-6')).not.toBeInTheDocument();
    expect(screen.queryByTestId('TreeList.item.container-7')).not.toBeInTheDocument();

    act(() => {screen.getByTestId('TreeList.item.expand-3').click();});

    expect(screen.getByTestId('TreeList.item.container-1')).toBeInTheDocument();
    expect(screen.getByTestId('TreeList.item.container-2')).toBeInTheDocument();
    expect(screen.getByTestId('TreeList.item.container-3')).toBeInTheDocument();
    expect(screen.getByTestId('TreeList.item.container-4')).toBeInTheDocument();
    expect(screen.queryByTestId('TreeList.item.container-5')).not.toBeInTheDocument();
    expect(screen.queryByTestId('TreeList.item.container-6')).not.toBeInTheDocument();
    expect(screen.getByTestId('TreeList.item.container-7')).toBeInTheDocument();
  });

  it('should render TreeList with selected child', () => {
    const screen = setupScreen(mockTreeListData, '7');

    expect(screen.getByTestId('TreeList.item.container-1')).toBeInTheDocument();
    expect(screen.getByTestId('TreeList.item.container-2')).toBeInTheDocument();
    expect(screen.getByTestId('TreeList.item.container-3')).toBeInTheDocument();
    expect(screen.getByTestId('TreeList.item.container-4')).toBeInTheDocument();
    expect(screen.queryByTestId('TreeList.item.container-5')).not.toBeInTheDocument();
    expect(screen.queryByTestId('TreeList.item.container-6')).not.toBeInTheDocument();
    expect(screen.getByTestId('TreeList.item.container-7')).toBeInTheDocument();
  });

  it('should render TreeList and click the child', () => {
    const screen = setupScreen(mockTreeListData, '7');

    screen.getByText('Page 1.2.1').click();

    expect(onSelect).toHaveBeenCalledWith('7');
    expect(onSelect).toHaveBeenCalled();
  });
});
