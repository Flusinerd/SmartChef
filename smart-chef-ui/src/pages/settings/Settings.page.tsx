import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { baseUrl } from "../../api";
import { AuthService } from "../../authentication";
import { default as SCButton } from "../../components/button/button";
import Input from "../../components/input/Input";
import SCModal from "../../components/modal/Modal";
import SCPasswordStrength from "../../components/passwordStrength/PasswordStrength";
import SCResponsiveContainer from "../../components/responsive-container/responsive-container";
import emailRegex from "../../shared/email-regex";
import { classNames } from "../../shared/merge-classnames";
import styles from "./Settings.module.css";

function SCSettingsPage() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [emailSet, setEmailSet] = useState(false);
  const [passwordSet, setPasswordSet] = useState(false);
  const [passwordConfirmSet, setPasswordConfirmSet] = useState(false);

  const authService = AuthService.getInstance();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "all",
  });

  React.useEffect(() => {
    setPasswordMatch(password === passwordConfirm);
  }, [password, passwordConfirm]);

  const [overlayVisible, setOverlayVisible] = useState(false);

  const showOverlayHandler = () => {
    setOverlayVisible(true);
  };

  const hideOverlayHandler = () => {
    setOverlayVisible(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    // Check if the target is the password input
    if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "passwordConfirm") {
      setPasswordConfirm(event.target.value);
    }

    // Check if the target is the email input
    if (event.target.name === "email" && event.target.value !== "") {
      setEmailSet(true);
    } else if (event.target.name === "email" && event.target.value === "") {
      setEmailSet(false);
    }

    // Check if the target is the password input
    if (event.target.name === "password" && event.target.value !== "") {
      setPasswordSet(true);
    } else if (event.target.name === "password" && event.target.value === "") {
      setPasswordSet(false);
    }

    // Check if the target is the passwordConfirm input
    if (event.target.name === "passwordConfirm" && event.target.value !== "") {
      setPasswordConfirmSet(true);
    } else if (
      event.target.name === "passwordConfirm" &&
      event.target.value === ""
    ) {
      setPasswordConfirmSet(false);
    }
  };

  const onDelete = async () => {
    if (!authService.tokenData) {
      return;
    }
    const res = await axios.delete(
      `${baseUrl}/api/users/${authService.tokenData.sub}/`
    );

    if (res.status === 204) {
      alert("Ihr Konto wurde gelöscht.");
    } else {
      alert("Es ist ein Fehler aufgetreten.");
    }

    hideOverlayHandler();
    authService.logout();
    document.location.href = "/";
  };

  const onFormSubmit = async (data: FormValues) => {
    const { email, password } = data;
    const user: { email?: string; password?: string } = {
      email: undefined,
      password: undefined,
    };
    if (password !== "") {
      user.password = password;
    }
    if (email !== "") {
      user.email = email;
    }

    if (authService.tokenData) {
      const response = await axios.patch(
        `${baseUrl}/api/users/${authService.tokenData?.sub}/`,
        user
      );
      if (response.status === 200) {
        alert("Erfolgreich aktualisiert");
        reset();
      } else {
        alert("Fehler beim Aktualisieren");
      }
    }
  };

  return (
    <SCResponsiveContainer pageTitle="Einstellungen">
      {overlayVisible && (
        <SCModal
          buttons={
            <div className="flex flex-row justify-end">
              <SCButton
                onClick={hideOverlayHandler}
                className={classNames(styles.alternate)}
              >
                Abbrechen
              </SCButton>
              <SCButton
                onClick={onDelete}
                style={{
                  marginLeft: "0.75rem",
                }}
              >
                Löschen
              </SCButton>
            </div>
          }
        >
          <span>
            Sind sie sicher, dass Sie ihr Benutzerkonto löschen möchten?
          </span>
        </SCModal>
      )}
      <div className={styles.wrapper}>
        <form
          className={styles["user-settings"]}
          onChange={onChange}
          onSubmit={handleSubmit(onFormSubmit)}
        >
          <h2>Nutzereinstellungen</h2>
          <div className={styles.inputfield}>
            <label htmlFor="changeEmail">E-Mail ändern</label>
            <Input
              placeholder="E-Mail Adresse"
              register={register("email", { pattern: emailRegex })}
            />
            {errors.email && (
              <span className="color-primary">E-Mail Adresse ist ungültig</span>
            )}
          </div>
          <div className={styles.inputfield}>
            <label htmlFor="changePassword">Passwort ändern</label>
            <Input
              type="password"
              id="password-input"
              placeholder="Passwort ändern"
              autoComplete="new-password"
              register={register("password", {
                minLength: 8,
                // Check for one lowercase letter, one uppercase letter and one number
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              })}
            ></Input>
            {errors.password?.type === "minLength" && (
              <span className="color-primary" data-cy="password-length-error">
                Das Passwort muss mindestens 8 Zeichen lang sein
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="color-primary" data-cy="password-pattern-error">
                Das Passwort muss einen Kleinbuchstaben, einen Großbuchstaben
                und eine Ziffer enthalten
              </span>
            )}
            <SCPasswordStrength
              password={password}
              className={styles["password-strength"]}
            ></SCPasswordStrength>
          </div>
          <div className={styles.inputfield}>
            <label htmlFor="againPassword"></label>
            <Input
              type="password"
              id="password-confirm-input"
              placeholder="Passwort bestätigen"
              autoComplete="new-password"
              register={register("passwordConfirm", {
                minLength: 8,
                // Check for one lowercase letter, one uppercase letter and one number
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
              })}
            ></Input>
            {!passwordMatch && (
              <span className="color-primary" data-cy="password-mismatch-error">
                Die Passwörter stimmen nicht überein
              </span>
            )}
          </div>

          <div className={styles.actions}>
            <div>
              <SCButton
                className={classNames(styles.button, styles.alternate)}
                // The button should be disabled, if none of the inputs are filled
                // or if the passwords don't match
                // or if the form is invalid
                disabled={
                  !isValid ||
                  !passwordMatch ||
                  (!passwordSet && !passwordConfirmSet && !emailSet)
                }
                type="submit"
              >
                Änderungen speichern
              </SCButton>
            </div>
            <div>
              <SCButton className={styles.button} onClick={showOverlayHandler}>
                Benutzerkonto löschen
              </SCButton>
            </div>
          </div>
        </form>
        <div className={styles["household-settings"]}>
          <h2>Haushaltseinstellungen</h2>
          <div className={styles["hs-action"]}>
            {/* <div>
              <Link to="/users">
                <SCButton
                  className={classNames(styles.button, styles.alternate)}
                  id={styles.btn1}
                >
                  Mitglieder verwalten
                </SCButton>
              </Link>
            </div> */}
            <div>
              <Link to="/stock">
                <SCButton
                  className={classNames(styles.button, styles.alternate)}
                  id={styles.btn1}
                >
                  Bestand verwalten
                </SCButton>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.bottomBtnContainer}>
          <Link to="/login">
            <SCButton
              className={styles.logoutBtn}
              onClick={() => {
                authService.logout();
                document.location.href = "/";
              }}
            >
              Abmelden
            </SCButton>
          </Link>
        </div>
      </div>
    </SCResponsiveContainer>
  );
}

export default SCSettingsPage;

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};
