import React from "react";
import styles from "./User.module.css";
import { ReactComponent as Delete } from "./delete.svg";

const SCUser = ({
  id,
  firstname,
  lastname,
  email,
  deleteUserHandler,
}: SCUserProps) => {
  const deleteUser = () => {
    deleteUserHandler(id);
  };

  return (
    <li>
      <div className={styles.liwrapper}>
        <div className={styles.names}>
          <span>{firstname}</span>
          <span>{lastname}</span>
        </div>
        <div className={styles.emailaction}>
          <div>{email}</div>
          <button onClick={deleteUser}>
            <Delete className={styles.delete} />
          </button>
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
