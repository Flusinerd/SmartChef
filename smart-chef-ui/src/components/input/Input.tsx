import { InputHTMLAttributes } from "react";
import "./input.css";
import ErrorIcon from "./error.svg";
import { UseFormRegisterReturn } from "react-hook-form";

function SCInput(props: SCInputProps) {
  const { error, register, ...rest } = props;
  return (
    <div className="sc-input">
      <input
        {...register}
        {...rest}
        className={props.error ? "sc-input-error sc-input" : "sc-input"}
      />
      {!!error && (
        <img src={ErrorIcon} alt="" className="sc-input-error-icon" />
      )}
      {typeof error === "string" && (
        <div className="sc-input-error">{error}</div>
      )}
    </div>
  );
}

export default SCInput;

export type SCInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean | string;
  register?: UseFormRegisterReturn;
};
