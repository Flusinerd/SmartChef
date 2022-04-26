import React, { useState } from "react";
import "./Toggle.css";

function Toggle() {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => setIsToggled(!isToggled);
  return (
    <div className="toggle-div">
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="switch" />
    </label>
    <label className="toggle-title">
        {isToggled ? "Einbuchen" : "Ausbuchen"}
    </label>
    </div>
  );
}

export default Toggle;