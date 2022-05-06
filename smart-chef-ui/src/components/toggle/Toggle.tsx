import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./Toggle.module.css";

function SCToggle(props: SCToggleProps) {
  const { activeLabel, inactiveLabel, register, ...rest } = props;
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = (event: { target: any; type?: any }) => {
    setIsToggled(!isToggled);
    if (register) {
      register.onChange(event);
    }
  };

  return (
    <div className={styles["toggle-div"]} {...rest}>
      <label className={styles["toggle-switch"]}>
        <input
          type="checkbox"
          checked={isToggled}
          {...register}
          onChange={onToggle}
        />
        <span className={styles.switch} />
      </label>
      <label className={styles["toggle-title"]}>
        {isToggled ? activeLabel : inactiveLabel}
      </label>
    </div>
  );
}

export default SCToggle;

export type SCToggleProps = {
  activeLabel: React.ReactNode | string;
  inactiveLabel: React.ReactNode | string;
  register?: UseFormRegisterReturn;
} & React.HTMLAttributes<HTMLDivElement>;
