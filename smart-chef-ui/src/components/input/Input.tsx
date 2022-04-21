import { InputHTMLAttributes } from "react";
import "./input.css";
import ErrorIcon from "./error.svg";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

function SCInput(props: SCInputProps) {
  const { error, register, registerOptions, label } = props;
  return (
    <div className="sc-input">
      <input
        {...register(label, registerOptions)}
        type={props.type}
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
  label: string;
  registerOptions: RegisterOptions
  register: UseFormRegister<FieldValues>;
};
