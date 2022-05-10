import React from "react";
import "./formGroup.css";

function SCFormGroup(props: SCFormGroupProps) {
  const { label, inputId, required, horizontal, className, ...rest } = props;
  return (
    <div
      className={
        `sc-form-group ${className} ` +
        (horizontal ? "sc-form-group-horizontal " : "sc-form-group-vertical ")
      }
      {...rest}
    >
      <label htmlFor={inputId} className={required ? "mb-1 required" : "mb-1"}>
        {label}
      </label>
      {props.children}
    </div>
  );
}

export default SCFormGroup;

export interface SCFormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  horizontal?: boolean;
  required?: boolean;
  label: string;
  inputId: string;
}
