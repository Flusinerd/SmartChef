import React from "react";
import { globalStateContext } from "../../App";
import styles from "./Loading.module.css";

function SCLoading() {
  const { loading } = React.useContext(globalStateContext);
  return loading ? (
    <div className={styles.overlay}>
      <div className={styles.spinner}>
        <div className={styles["double-bounce1"]}></div>
        <div className={styles["double-bounce2"]}></div>
      </div>
    </div>
  ) : null;
}

export default SCLoading;
