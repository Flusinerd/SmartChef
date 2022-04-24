import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useGlobalState } from "../../App";
import BgImage from "../../assets/images/background.svg";
import { AuthService } from "../../authentication";
import SCButton from "../../components/button/button";
import SCCard from "../../components/card/Card";
import SCFormGroup from "../../components/form-group/FormGroup";
import SCInput from "../../components/input/Input";
import emailRegex from "../../shared/email-regex";
import styles from "./loginpage.module.css";

function SCLoginPage() {
  const authServie = AuthService.getInstance();
  const [, dispatch] = useGlobalState();

  const onSubmit: SubmitHandler<FormValues> = async ({ email, password }) => {
    console.log("email: ", email);
    try {
      dispatch({ loading: true });
      await authServie.login(email, password);
      alert("Login success");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response && response.status === 401) {
          alert("E-Mail Adresse oder Passwort ist falsch");
        } else {
          alert("Es ist ein Fehler aufgetreten");
        }
      } else {
        console.log("Error logging in: ", error);
      }
    } finally {
      dispatch({ loading: false });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "all",
  });

  return (
    <div className={styles.wrapper}>
      <h1>
        <span className="color-primary">Smart</span>Chef
      </h1>
      <img src={BgImage} alt="" className="sc-bg-image" />
      <div className={styles["login-card"]}>
        <SCCard title="Anmelden" mobileFullScreen>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <SCFormGroup
              label="Email"
              required
              inputId="email-input"
              className="mb-5"
            >
              <SCInput
                type="text"
                id="email-input"
                placeholder="Bitte geben Sie Ihre Email-Adresse ein"
                register={register("email", {
                  required: true,
                  pattern: emailRegex,
                })}
              ></SCInput>
              {errors.email?.type === "required" && (
                <span className="color-primary" data-cy="email-required-error">
                  E-Mail Adresse benötigt
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="color-primary" data-cy="email-invalid-error">
                  E-Mail Adresse ungültig
                </span>
              )}
            </SCFormGroup>
            <SCFormGroup
              label="Passwort"
              required
              inputId="password-input"
              className="mb-8"
            >
              <SCInput
                type="password"
                id="password-input"
                placeholder="Bitte geben Sie Ihr Passwort ein"
                register={register("password", {
                  required: true,
                  minLength: 8,
                })}
              ></SCInput>
              {errors.password?.type === "required" && (
                <span
                  className="color-primary"
                  data-cy="password-required-error"
                >
                  Passwort wird benötigt
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span
                  className="color-primary"
                  data-cy="password-invalid-error"
                >
                  Passwort zu kurz
                </span>
              )}
            </SCFormGroup>
            <div className={styles["action-texts"] + " mb-5"}>
              <Link to="/forgot-password">Passwort vergessen</Link>
              <Link to="/register">Konto erstellen</Link>
            </div>
            <SCButton className="w-full" type="submit" disabled={!isValid}>
              Anmelden
            </SCButton>
          </form>
        </SCCard>
      </div>
    </div>
  );
}

export default SCLoginPage;

type FormValues = {
  email: string;
  password: string;
};
