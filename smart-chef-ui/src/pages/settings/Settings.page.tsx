import styles from "./Settings.module.css";
import React from "react";
import SCNavbar from "../../components/navbar/Navbar";
import Input from "../../components/input/Input";
// import PasswordStrength from "../../components/passwordStrength/PasswordStrength";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";

function SCSettingsPage() {
  return (
    <React.Fragment>
      <SCNavbar />
      <div className={styles.wrapper}>
        <div className={styles["user-settings"]}>
          <h2>Nutzereinstellungen</h2>
          <div className={styles.inputfield}>
            <label htmlFor="changeEmail">E-Mail ändern</label>
            <Input placeholder="E-Mail Adresse" />
          </div>
          <div className={styles.inputfield}>
            <label htmlFor="changePassword">Passwort ändern</label>
            <Input placeholder="Passwort ändern" />
            {/* <PasswordStrength  /> */}
          </div>
          <div className={styles.inputfield}>
            <label htmlFor="againPassword"></label>
            <Input placeholder="Passwort bestätigen" />
          </div>
        </div>

        <div className={styles.actions}>
          <div>
            <Button className={styles.buttons} id={styles.btn1}>
              Änderungen speichern
            </Button>
          </div>
          <div>
            <Button className={styles.btn2}>Benutzerkonto löschen</Button>
          </div>
        </div>

        <div className={styles["household-settings"]}>
          <h2>Haushaltseinstellungen</h2>
          <div>
            <Button className={styles.buttons} id={styles.btn1}>
              Mitglieder verwalten
            </Button>
          </div>
          <div>
            <Button className={styles.buttons} id={styles.btn1}>
              Bestand verwalten
            </Button>
          </div>
        </div>
        <div className={styles.bottomBtnContainer}>
          <Link to="/login">
            <Button className={styles.logoutBtn}>Abmelden</Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SCSettingsPage;
