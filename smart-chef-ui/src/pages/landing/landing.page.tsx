import React from "react";
import SCButton from "../../components/button/button";
import styles from "./landingpage.module.css";
import Image1 from "./images/image1.svg";
import Image2 from "./images/image2.svg";
import Image3 from "./images/image3.svg";
import BGImage from "../../assets/images/background.svg";
import { Link } from "react-router-dom";

export function SCLandingPage(): React.ReactElement {
  return (
    <div className={styles.wrapper}>
      <img src={BGImage} alt="" id={styles["bg-image"]} />
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className="color-primary">Smart</span>
          Chef
        </h1>

        <Link to="/login">
          <SCButton id={styles["desktop-btn"]}>Anmelden</SCButton>
        </Link>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        <p id={styles.text1}>
          Erstell dir deine individuelle Smarte Einkaufsliste mit SmartChef
        </p>
        <p id={styles.text2}>
          Scanne deine Lieblingsprodukte mit deinem Handy ein und lasse dir auf
          SmartChef anzeigen, was du dir damit kochen kannst
        </p>
        <p id={styles.text3}>
          Erstelle zusammen mit deinen Freunden oder deiner Familie eine
          gemeinsame Einkaufsliste
        </p>
        <img src={Image1} alt="" id={styles.image1}></img>
        <img src={Image2} alt="" id={styles.image2}></img>
        <img src={Image3} alt="" id={styles.image3}></img>
      </div>
      <div id={styles["mobile-btn"]}>
        <Link to="/login">
          <SCButton>Anmelden</SCButton>
        </Link>
      </div>
    </div>
  );
}
