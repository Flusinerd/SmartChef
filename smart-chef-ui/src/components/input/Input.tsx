import { InputHTMLAttributes } from "react";
import "./input.css";
import ErrorIcon from "./error.svg";

function SCInput(props: SCInputProps) {
  const { error } = props;
  return (
    <div className="sc-input">
      <input
        {...props}
        className={props.error ? "sc-input-error sc-input" : "sc-input"}
      />
      {error && <img src={ErrorIcon} alt="" className="sc-input-error-icon" />}
      {error && <div className="sc-input-error">{error}</div>}
    </div>
  );
}

export default SCInput;

export type SCInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};
