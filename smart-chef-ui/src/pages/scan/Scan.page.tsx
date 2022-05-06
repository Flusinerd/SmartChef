import React from "react";
import SCNavbar from "../../components/navbar/Navbar";
import styles from "./Scanpage.module.css";
import Dude from "./dude.svg";

const SCScanPage = () => {
  return (
    <>
      <SCNavbar />
        <div className={styles.scanWrapper}>
        <img src={Dude} alt="dude" />
          <div>
            {/* Toggle */}
            <button>Klick</button>
            Ausbuchen
            <div className={styles.scan}></div>
          </div>
        </div>
    </>
  );
};

export default SCScanPage;
