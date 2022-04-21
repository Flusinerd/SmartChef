import styles from "./loginpage.module.css";
import BgImage from "../../assets/images/background.svg";
import SCCard from "../../components/card/Card";
import SCFormGroup from "../../components/form-group/FormGroup";
import SCButton from "../../components/button/button";
import { Link } from "react-router-dom";
import React from "react";
import { useForm } from "react-hook-form";
import emailRegex from "../../shared/email-regex";

function SCLoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [disabled, setDisabled] = React.useState(true);

  const onSubmit = (data: any) => {
    // event.preventDefault();
    console.log("Form submitted", data);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  // const handleChange = (event: any) => {
  //   // Validate email input
  //   if (event.target.name === "email") {
  //     const email = event.target.value;
  //     if (emailRegex.test(email)) {
  //       setEmail(email);
  //       setEmailError("");
  //     } else {
  //       setEmail("");
  //       // Set the error on the email input
  //       setEmailError("E-Mail Adresse ist ungültig");
  //     }
  //   }

  //   // Validate password input
  //   if (event.target.name === "password") {
  //     const password = event.target.value;
  //     if (password.length >= 8) {
  //       setPassword(password);
  //       setPasswordError("");
  //     } else {
  //       setPassword("");
  //       // Set the error on the password input
  //       setPasswordError("Passwort muss mindestens 8 Zeichen lang sein");
  //     }
  //   }

  //   // Disable the login button if the email or password is empty
  //   if (emailError || passwordError) {
  //     setDisabled(true);
  //   } else {
  //     setDisabled(false);
  //   }
  // };

  return (
    <div className={styles.wrapper}>
      <h1>
        <span className="color-primary">Smart</span>Chef
      </h1>
      <img src={BgImage} alt="" className="sc-bg-image" />
      <div className={styles["login-card"]}>
        <SCCard title="Anmelden">
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <SCFormGroup
                label="Email"
                placeholder="Bitte E-Mail Adresse eingeben"
                error={emailError}
                defaultValue={email}
                autoComplete="email"
                register={register}
                registerOptions={{ required: true, pattern: emailRegex }}
              ></SCFormGroup>
              {errors.Email && (
                <span className="color-primary">E-Mail Adresse ungültig</span>
              )}
            </div>
            <SCFormGroup
              label="Password"
              placeholder="Bitte Passwort eingeben"
              className="mb-8"
              defaultValue={password}
              type="password"
              error={passwordError}
              register={register}
              registerOptions={{ required: true }}
              autoComplete="current-password"
            ></SCFormGroup>
            <div className={styles["action-texts"] + " mb-5"}>
              <Link to="/forgot-password">Passwort vergessen</Link>
              <Link to="/register">Konto erstellen</Link>
            </div>
            <SCButton className="w-full" type="submit">
              Anmelden
            </SCButton>
          </form>
        </SCCard>
      </div>
    </div>
  );
}

export default SCLoginPage;
