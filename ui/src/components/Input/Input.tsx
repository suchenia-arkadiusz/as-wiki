import "./Input.css";

const Input = (props) => {
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
