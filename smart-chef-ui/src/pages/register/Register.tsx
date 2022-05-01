import axios from "axios";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { baseUrl } from "../../api";
import { useGlobalState } from "../../App";
import BgImage from "../../assets/images/background.svg";
import SCButton from "../../components/button/button";
import SCCard from "../../components/card/Card";
import SCFormGroup from "../../components/form-group/FormGroup";
import SCInput from "../../components/input/Input";
import SCPasswordStrength from "../../components/passwordStrength/PasswordStrength";
import emailRegex from "../../shared/email-regex";
import styles from "./register.module.scss";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

function SCRegisterPage() {
  const [, dispatch] = useGlobalState();
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [passwordMatch, setPasswordMatch] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm<FormValues>({
    mode: "all",
  });

  const onSubmit: SubmitHandler<FormValues> = async ({
    firstName,
    lastName,
    email,
    password,
  }) => {
    try {
      dispatch({ loading: true });
      await axios.post(`${baseUrl}/api/users/`, {
        firstName,
        lastName,
        email,
        password,
      });
      // Redirect to /login
      window.location.href = "/login";
    } catch (error) {
      console.log("error", error);
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response && response.status === 409) {
          alert("E-Mail Adresse ist bereits vergeben");
        } else {
          alert("Es ist ein Fehler aufgetreten");
        }
      } else {
        console.log("Error registering: ", error);
      }
    } finally {
      dispatch({ loading: false });
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    // Check if the target is the password input
    if (event.target.name === "password") {
      setPassword(event.target.value);
    } else if (event.target.name === "passwordConfirm") {
      setPasswordConfirm(event.target.value);
    }
  };

  React.useEffect(() => {
    setPasswordMatch(password === passwordConfirm);
  }, [password, passwordConfirm]);

  return (
    <div className="sc-wrapper">
      <h1>
        <span className="color-primary">Smart</span>Chef
      </h1>
      <img src={BgImage} alt="" className="sc-bg-image" />
      <div className={styles["register-card"]}>
        <SCCard mobileFullScreen title="Registrieren">
          <form
            className="mt-4"
            onChange={onChange}
            onSubmit={handleSubmit(onSubmit)}
          >
            <SCFormGroup
              label="Vorname"
              required
              inputId="firstname-input"
              className="mb-5"
            >
              <SCInput
                type="text"
                id="firstname-input"
                placeholder="Bitte geben Sie Ihren Vornamen ein"
                register={register("firstName", { required: true })}
              ></SCInput>
              {errors.firstName?.type === "required" && (
                <span
                  className="color-primary"
                  data-cy="first-name-required-error"
                >
                  Bitte geben Sie Ihren Vornamen ein
                </span>
              )}
            </SCFormGroup>

            <SCFormGroup
              label="Nachname"
              required
              inputId="lastname-input"
              className="mb-5"
            >
              <SCInput
                type="text"
                id="lastname-input"
                placeholder="Bitte geben Sie Ihren Nachnamen ein"
                register={register("lastName", { required: true })}
              ></SCInput>
              {errors.lastName?.type === "required" && (
                <span
                  className="color-primary"
                  data-cy="last-name-required-error"
                >
                  Bitte geben Sie Ihren Nachnamen ein
                </span>
              )}
            </SCFormGroup>

            <SCFormGroup
              label="Email"
              required
              inputId="email-input"
              className="mb-5"
            >
              <SCInput
                type="email"
                id="email-input"
                placeholder="Bitte geben Sie Ihre Email-Adresse ein"
                register={register("email", {
                  required: true,
                  pattern: emailRegex,
                })}
              ></SCInput>
              {errors.email?.type === "required" && (
                <span className="color-primary" data-cy="email-required-error">
                  Bitte geben Sie Ihre Email-Adresse ein
                </span>
              )}
              {errors.email?.type === "pattern" && (
                <span className="color-primary" data-cy="email-pattern-error">
                  Bitte geben Sie eine gültige Email-Adresse ein
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
                  // Check for one lowercase letter, one uppercase letter and one number
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                })}
              ></SCInput>
              <SCPasswordStrength password={password}></SCPasswordStrength>
              {errors.password?.type === "required" && (
                <span
                  className="color-primary"
                  data-cy="password-required-error"
                >
                  Bitte geben Sie Ihr Passwort ein
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="color-primary" data-cy="password-length-error">
                  Das Passwort muss mindestens 8 Zeichen lang sein
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span
                  className="color-primary"
                  data-cy="password-pattern-error"
                >
                  Das Passwort muss einen Kleinbuchstaben, einen Großbuchstaben
                  und eine Ziffer enthalten
                </span>
              )}
            </SCFormGroup>

            <SCFormGroup
              label="Passwort wiederholen"
              required
              inputId="password-confirm-input"
              className="mb-8"
            >
              <SCInput
                type="password"
                id="password-confirm-input"
                placeholder="Bitte geben Sie Ihr Passwort ein"
                register={register("passwordConfirm", {
                  required: true,
                  minLength: 8,
                })}
              ></SCInput>
              {errors.passwordConfirm?.type === "required" && (
                <span
                  className="color-primary"
                  data-cy="password-confirm-required-error"
                >
                  Bitte geben Sie Ihr Passwort erneut ein
                </span>
              )}
              {errors.passwordConfirm?.type === "minLength" && (
                <span className="color-primary">
                  Das Passwort muss mindestens 8 Zeichen lang sein
                </span>
              )}
              {password !== passwordConfirm && (
                <span
                  className="color-primary"
                  data-cy="password-mismatch-error"
                >
                  Die Passwörter stimmen nicht überein
                </span>
              )}
            </SCFormGroup>

            <SCButton
              type="submit"
              className="w-full"
              disabled={!isValid || !passwordMatch}
            >
              Registrieren
            </SCButton>
          </form>
        </SCCard>
      </div>
    </div>
  );
}

export default SCRegisterPage;
