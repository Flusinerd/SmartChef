import styles from "./Fab.module.css";
import Plus from "./Plus.svg";

function SCFab({ showModal }: any) {
  return (
    <button className={styles.fab} onClick={showModal}>
      <img src={Plus} alt="plusIcon" />
    </button>
  );
}

export default SCFab;
