import Plus from "./plusIcon.svg";
import styles from "./Fab.module.css";

function SCFab({showModal} : any) {

  return (
    <button className={styles.fab} onClick={showModal}>
      <img src={Plus} alt="plusIcon" />
    </button>
  );
}

export default SCFab;
