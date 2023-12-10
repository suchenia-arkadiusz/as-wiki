import "./Input.css";
import { ForwardedRef, forwardRef, HTMLProps } from "react";

type InputProps = HTMLProps<HTMLInputElement> & {
  label: string;
  isRequired?: boolean;
  validated: boolean;
  inputKey: string | undefined;
};

const Input = forwardRef((props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { label, placeholder, isRequired, validated, type, onChange, inputKey } = props;

  return (
    <div>
      <label htmlFor={inputKey}>
        {label} {isRequired ? "*" : null}
      </label>
      <br />
      <input
        ref={ref}
        className={`app-text-input${!validated ? " app-input-not-validated" : ""}`}
        type={type}
        key={inputKey}
        id={inputKey}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
});

export default Input;
