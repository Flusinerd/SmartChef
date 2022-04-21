import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
import SCInput, { SCInputProps } from "../input/Input";
import "./formGroup.css";

function SCFormGroup(props: SCFormGroupProps) {
  const { register, registerOptions, label } = props;
  return (
    <div
      className={
        "sc-form-group " +
        (props.horizontal
          ? "sc-form-group-horizontal "
          : "sc-form-group-vertical ") +
        props.className
      }
    >
      <label htmlFor={props.name} className={props.registerOptions?.required ? " required" : ""}>
        {props.label}
      </label>
      <SCInput {...props} />
    </div>
  );
}

export default SCFormGroup;

export interface SCFormGroupProps extends SCInputProps {
  horizontal?: boolean;
  required?: boolean;
  label: string;
  register: UseFormRegister<FieldValues>
  registerOptions: RegisterOptions
}
