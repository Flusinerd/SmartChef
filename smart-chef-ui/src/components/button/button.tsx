import React from 'react';
import './button.css';

export function SCButton(props: any) {
  const [disabled] = React.useState(props.disabled);

  return (
    <button type="button" className="sc-button" {...props} disabled={disabled}>
      {props.children}
    </button>
  );
}
