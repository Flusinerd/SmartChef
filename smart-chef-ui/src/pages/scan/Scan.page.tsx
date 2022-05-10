import React from "react";
import SCNavbar from "../../components/navbar/Navbar";
import styles from "./Scanpage.module.css";
import Dude from "./dude.svg";
import SCToggle from "../../components/toggle/Toggle";

const SCScanPage = () => {
  return (
    <>
      <SCNavbar />
      <div className={styles.scanWrapper}>
        <img src={Dude} alt="dude" />
        <div>
          <div className={styles.toggleWrapper}>
            <SCToggle activeLabel="Ausbuchen" inactiveLabel="Einscannen" />
          </div>
          <div className={styles.scan}></div>
        </div>
      </div>
    </>
  );
};

export default SCScanPage;
