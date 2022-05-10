import styles from "./Fab.module.css";
import Plus from "./Plus.svg";

//sollte eigentlich eine vom Type Function sein
function SCFab(props: SCFabProps) {
  return (
    <button className={styles.fab} {...props}>
      <img src={Plus} alt="plusIcon" />
    </button>
  );
}

type SCFabProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default SCFab;