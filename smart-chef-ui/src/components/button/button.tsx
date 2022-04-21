import React from "react";
import "./button.css";

function SCButton(props: SCButtonProps) {
  const [disabled] = React.useState(props.disabled);
  const { className, children, ...rest } = props;

  return (
    <button
      type="button"
      className={`sc-button ${className}`}
      {...rest}
      disabled={disabled}
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
