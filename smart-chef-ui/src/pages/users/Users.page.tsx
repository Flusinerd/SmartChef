import styles from "./UsersPage.module.css";
import SCInput from "../../components/input/Input";
import SCUsers from "../../components/users/Users";
import House from "./house.svg";
import SCResponsiveContainer from "../../components/responsive-container/responsive-container";
import { ReactComponent as Exit } from "./exitbutton.svg";
import SCModal from "../../components/modal/Modal";
import { useState } from "react";

function SCUsersPage() {
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <SCResponsiveContainer>
      {showModal && <SCModal hideOverlay={hideModal} />}
      <div className={styles.usersBackground}>
        <img src={House} alt="house" />
        <div className={styles.contentwrapper}>
          <div className={styles.actions}>
            <div className={styles.switchhousehold}>
              <SCInput placeholder="Haushalt 1" disabled={true} />
              <button onClick={() => setShowModal(true)}>
                <Exit className={styles.exit} />
              </button>
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
