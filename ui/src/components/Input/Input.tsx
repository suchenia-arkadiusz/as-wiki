import "./Input.css";
import { HTMLProps } from "react";

type InputProps = HTMLProps<HTMLInputElement> & {
  label: string;
  value: string;
  isRequired?: boolean;
  validated: boolean;
  inputKey: string | undefined;
};

const Input = (props: InputProps) => {
  const { label, value, placeholder, isRequired, validated, type, onChange, inputKey } = props;

  return (
    <div>
      <label htmlFor={inputKey}>
        {label} {isRequired ? "*" : null}
      </label>
      <br />
      <input
        className={`app-text-input${!validated ? " app-input-not-validated" : ""}`}
        type={type}
        value={value}
        key={inputKey}
        id={inputKey}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
