
import React, { useState } from "react";
import styles from "./Toggle.module.css";


function SCToggle(props: React.HTMLAttributes<HTMLDivElement>) {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => setIsToggled(!isToggled);
  const {children, ...rest} = props
  const title = String(props.children).split("/");
  

  return (
    <React.Fragment>
      <div className={styles["toggle-div"]}{...rest} >
        <label className={styles["toggle-switch"]}>
          <input type="checkbox" checked={isToggled} onChange={onToggle} />
          <span className={styles.switch} />
        </label>
        <label className={styles["toggle-title"]}>
          {isToggled ? title[0] : title[1]}
        </label>
    </div>
    </React.Fragment>
  );
}


export default SCToggle;