import './TextArea.css';
import { type ForwardedRef, forwardRef, type HTMLProps } from 'react';
import styled from 'styled-components';

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
`;

type TextAreaProps = HTMLProps<HTMLTextAreaElement> & {
  label: string
  isRequired?: boolean
  validated: boolean
  inputKey: string | undefined
}

const TextArea = forwardRef((props: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  const { label, placeholder, isRequired, validated, onChange, inputKey, rows, defaultValue } = props;

  return (
    <TextAreaContainer data-testid="TextAreaContainer">
      <label data-testid="TextAreaContainer.label" htmlFor={inputKey}>
        {label} {isRequired ? '*' : null}
      </label>
      <textarea
        data-testid="TextAreaContainer.textarea"
        ref={ref}
        className={`app-text-textarea${!validated ? ' app-textarea-not-validated' : ''}`}
        key={inputKey}
        id={inputKey}
        placeholder={placeholder}
        onChange={onChange}
        rows={rows}
        defaultValue={defaultValue}
      />
    </TextAreaContainer>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
