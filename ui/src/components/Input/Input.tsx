import './Input.css';
import { type ForwardedRef, forwardRef, type HTMLProps } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

type InputProps = HTMLProps<HTMLInputElement> & {
  label: string;
  isRequired?: boolean;
  validated: boolean;
  inputKey: string | undefined;
};

const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { label, placeholder, isRequired, validated, type, onChange, inputKey, defaultValue, value } = props;

  return (
    <InputContainer data-testid="InputContainer">
      <label htmlFor={inputKey} data-testid="InputContainer.label">
        {label} {isRequired ? '*' : null}
      </label>
      <input
        data-testid="InputContainer.input"
        value={value}
        ref={ref}
        className={`app-text-input${!validated ? ' app-input-not-validated' : ''}`}
        type={type}
        key={inputKey}
        id={inputKey}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </InputContainer>
  );
});

Input.displayName = 'Input';

export default Input;
