import styles from "./UsersPage.module.css";
import SCInput from "../../components/input/Input";
import SCUsers from "../../components/users/Users";
import House from "./house.svg";
import SCResponsiveContainer from "../../components/responsive-container/responsive-container";
import { ReactComponent as Exit } from "./exitbutton.svg";

function SCUsersPage() {
  return (
    <SCResponsiveContainer>
      <div className={styles.usersBackground}>
          <img src={House} alt="house" />
        <div className={styles.contentwrapper}>
          <div className={styles.actions}>
            <div className={styles.switchhousehold}>
              <SCInput placeholder="Haushalt 1" disabled={true} />
              <button><Exit className={styles.exit} /></button>
            </div>

            <SCInput placeholder="Suchen" />
          </div>
          <SCUsers />
        </div>
      </div>
    </SCResponsiveContainer>
  );
}

export default SCUsersPage;
