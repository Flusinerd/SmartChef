import React from "react";
import "./button.css";

function SCButton(props: SCButtonProps) {
  const { className, children, disabled, ...rest } = props;

  return (
    <button
      type="button"
      className={`sc-button ${className}`}
      disabled={disabled}
      {...rest}
      data-cy="SCButton"
    >
      {children}
    </button>
  );
}

export default SCButton;

interface SCButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children?: React.ReactNode;
}
