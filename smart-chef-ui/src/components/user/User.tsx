import React from "react";
import styles from "./User.module.css";

const SCUser = ({ firstname, lastname, email }: SCUserProps) => {
  return (
    <li>
      <div className={styles.liwrapper}>
        <div className={styles.names}>
          <span>{firstname}</span>
          <span>{lastname}</span>
        </div>
        <div className={styles.emailaction}>
          {email}
          {/* präventiv mit button, da wir das icon nicht haben */}
          <button>-</button>
        </div>
      </div>
    </li>
  );
};

export default SCUser;

export interface SCUserProps {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}
