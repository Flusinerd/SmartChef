import React from "react";
import "./button.css";

function SCButton(props: SCButtonProps) {
  const [disabled] = React.useState(props.disabled);

  return (
    <button
      type="button"
      className="sc-button"
      {...props}
      disabled={disabled}
      data-cy="SCButton"
    >
      {props.children}
    </button>
  );
}

export default SCButton;

interface SCButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  children?: React.ReactNode;
}
