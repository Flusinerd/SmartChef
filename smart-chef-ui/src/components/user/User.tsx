import React from "react";
import styles from "./User.module.css";

const SCUser = ({ id, firstname, lastname, email, deleteUserHandler }: SCUserProps) => {

    const deleteUser = () => {
        deleteUserHandler(id);
    }

  return (
    <li>
      <div className={styles.liwrapper}>
        <div className={styles.names}>
          <span>{firstname}</span>
          <span>{lastname}</span>
        </div>
        <div className={styles.emailaction}>
          {email}
          {/* präventiv mit button, da wir das icon nicht haben. Löschen muss später in der DB erfolgen */}
          <button onClick={deleteUser}>-</button>
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
  deleteUserHandler: any;
}
