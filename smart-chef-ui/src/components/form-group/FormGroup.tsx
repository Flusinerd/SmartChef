import SCInput, { SCInputProps } from "../input/Input";
import "./formGroup.css";

function SCFormGroup(props: SCFormGroupProps) {
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
      <label htmlFor={props.name} className={props.required ? " required" : ""}>
        {props.label}
      </label>
      <SCInput {...props} id={props.name} required />
    </div>
  );
}

export default SCFormGroup;

export interface SCFormGroupProps extends SCInputProps {
  horizontal?: boolean;
  required?: boolean;
  label: string;
}
