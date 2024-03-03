import Search, { DataType } from '../../../src/components/Search/Search';
import { fireEvent, render } from '@testing-library/react';
import { expect, vi } from 'vitest';

const onChange = vi.fn();
const onSelect = vi.fn();

const setupScreen = (data: Array<DataType>) => {
  return render(<Search
    data={data}
    onChange={onChange}
    onSelect={onSelect}
  />);
};

describe('<Search />', () => {
  it('should render Search container', () => {
    const screen = setupScreen([]);

    expect(screen.getByTestId('Search.container')).toBeInTheDocument();
  });

  it('should render Input component', () => {
    const screen = setupScreen([]);

    expect(screen.getByTestId('InputContainer')).toBeInTheDocument();
  });

  it('should render DataContainer component', () => {
    const screen = setupScreen([]);

    expect(screen.getByTestId('Search.data.container')).toBeInTheDocument();
  });

  it('should render DataElement component', () => {
    const screen = setupScreen([{key: 'key', value: 'value'}, {key: 'key2', value: 'value2'}]);

    expect(screen.getByTestId('Search.data.element-key')).toBeInTheDocument();
    expect(screen.getByTestId('Search.data.element-key2')).toBeInTheDocument();
    expect(screen.getByText('value')).toBeInTheDocument();
    expect(screen.getByText('value2')).toBeInTheDocument();
  });

  it('should call onChange when input value changes', () => {
    const screen = setupScreen([]);
    screen.getByTestId('InputContainer.input').focus();
    fireEvent.change(screen.getByTestId('InputContainer.input'), { target: { value: 'test' } });
    screen.getByTestId('InputContainer.input').blur();

    expect(onChange).toHaveBeenCalledWith('test');
    expect(onChange).toHaveBeenCalled();
  });

  it('should call onSelect when data element is clicked', () => {
    const inputData = [{key: 'key', value: 'value'}, {key: 'key2', value: 'value2'}];
    const screen = setupScreen(inputData);
    fireEvent.click(screen.getByTestId('Search.data.element-key'));

    expect(onSelect).toHaveBeenCalledWith(inputData[0]);
    expect(onSelect).toHaveBeenCalled();
  });
});
