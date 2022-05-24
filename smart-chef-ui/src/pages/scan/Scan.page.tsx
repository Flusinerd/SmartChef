import React from "react";
import styles from "./Scanpage.module.css";
import Dude from "./dude.svg";
import SCToggle from "../../components/toggle/Toggle";
import SCResponsiveContainer from "../../components/responsive-container/responsive-container";

const SCScanPage = () => {
  return (
    <SCResponsiveContainer pageTitle="Scannen">
      <div className={styles.scanWrapper}>
        <img src={Dude} alt="" className={styles["bg-image"]} />
        <div>
          <div className={styles.toggleWrapper}>
            <SCToggle activeLabel="Ausbuchen" inactiveLabel="Einscannen" />
          </div>
          <div className={styles.scan}></div>
        </div>
      </div>
    </SCResponsiveContainer>
  );
};

export default SCScanPage;
