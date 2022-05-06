import styles from "./UsersPage.module.css";
import SCNavbar from "../../components/navbar/Navbar";
import SCInput from "../../components/input/Input";
import SCUsers from "../../components/users/Users";
import House from "./house.svg";

function SCUsersPage() {
  return (
    <>
      <SCNavbar />
      <div className={styles.usersBackground}>
          <img src={House} alt="house" />
        <div className={styles.contentwrapper}>
          <div className={styles.actions}>
            <div className={styles.switchhousehold}>
              <SCInput placeholder="Haushalt 1" disabled={true} />

              <button>raus</button>
            </div>

            <SCInput placeholder="Suchen" />
          </div>
          <SCUsers />
        </div>
      </div>
    </>
  );
}

export default SCUsersPage;
