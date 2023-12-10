import "./TextArea.css";
import { ForwardedRef, forwardRef, HTMLProps } from "react";

type TextAreaProps = HTMLProps<HTMLTextAreaElement> & {
  label: string;
  isRequired?: boolean;
  validated: boolean;
  inputKey: string | undefined;
};

const TextArea = forwardRef((props: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
  const { label, placeholder, isRequired, validated, onChange, inputKey } = props;

  return (
    <div>
      <label htmlFor={inputKey}>
        {label} {isRequired ? "*" : null}
      </label>
      <br />
      <textarea
        ref={ref}
        className={`app-text-textarea${!validated ? " app-textarea-not-validated" : ""}`}
        key={inputKey}
        id={inputKey}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
});

export default TextArea;
