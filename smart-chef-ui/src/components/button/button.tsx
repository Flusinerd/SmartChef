import React from 'react';
import './button.css';

export function SCButton(props: SCButtonProps) {
  const [disabled] = React.useState(props.disabled);

  return (
    <button type="button" className="sc-button" {...props} disabled={disabled}>
      {props.children}
    </button>
  );
}


interface SCButtonProps {
  disabled?: boolean;
  children?: React.ReactNode;
}
