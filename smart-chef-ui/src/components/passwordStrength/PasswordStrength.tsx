import React from "react";
import "./PasswordStrength.css";

function SCPasswordStrength(props: SCPasswordStrengthProps) {
  const [isWeak, setWeak] = React.useState(false);
  const [isMedium, setMedium] = React.useState(false);
  const [isStrong, setStrong] = React.useState(false);

  React.useEffect(() => {
    if (props.password) {
      // Weak: At least 8 characters and only letters or numbers
      if (props.password.length >= 8 && /^[0-9a-zA-Z]+$/.test(props.password)) {
        setWeak(true);
        setMedium(false);
        setStrong(false);
      } else {
        setWeak(false);
        setMedium(false);
        setStrong(false);
      }
      // Medium: 8 characters one uppercase, one lowercase, one number
      if (
        props.password.length >= 8 &&
        /[A-Z]/.test(props.password) &&
        /[a-z]/.test(props.password) &&
        /[0-9]/.test(props.password)
      ) {
        setWeak(true);
        setMedium(true);
        setStrong(false);
      }
      // Hard: 8 characters one uppercase, one lowercase, one number, one special character
      if (
        /[A-Z]/.test(props.password) &&
        /[a-z]/.test(props.password) &&
        /[0-9]/.test(props.password) &&
        /[!@#$%^&*]/.test(props.password)
      ) {
        setWeak(true);
        setMedium(true);
        setStrong(true);
      }
    } else {
      setWeak(false);
      setMedium(false);
      setStrong(false);
    }
  }, [props.password]);

  const baseClass = "sc-password-strength-indicator";

  return (
    <div {...props}>
      <div className="password-strength-container">
        {/* If password is set fill the first bar red */}
        <div
          className={(props.password ? "sc-filled-red " : "") + baseClass}
        ></div>
        <div className={(isWeak ? "sc-filled-red " : "") + baseClass}></div>
        <div
          className={(isMedium ? "sc-filled-yellow " : "") + baseClass}
        ></div>
        <div className={(isStrong ? "sc-filled-green " : "") + baseClass}></div>
      </div>
    </div>
  );
}

export interface SCPasswordStrengthProps
  extends React.HTMLAttributes<HTMLDivElement> {
  password?: string;
}

export default SCPasswordStrength;
