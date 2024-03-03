import MDEditor from '../../../src/components/MDEditor/MDEditor.tsx';
import { render } from '@testing-library/react';
import { expect } from 'vitest';

const setupScreen = (value: string, onChange: (_value: string) => void) => {
  return render(<MDEditor value={value} onChange={onChange} />);
};

describe.skip('<MDEditor />', () => {
  it('should render MDEditor container', () => {
    const screen = setupScreen('', () => {});

    expect(screen.getByTestId('MDEditor.container')).toBeInTheDocument();
  });

  it('should render MdEditor component with text', () => {
    const MDEDITOR_VALUE = 'Some text';
    const screen = setupScreen(MDEDITOR_VALUE, () => {});

    expect(screen.getByText(MDEDITOR_VALUE)).toBeInTheDocument();
  });
});
