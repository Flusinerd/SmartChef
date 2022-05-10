import { classNames } from "../../shared/merge-classnames";
import styles from "./Fab.module.css";
import Plus from "./Plus.svg";

function SCFab(props: SCFabProps) {
  const { className, ...rest } = props;
  return (
    <button className={classNames(className, styles.fab)} {...rest}>
      <img src={Plus} alt="plusIcon" />
    </button>
  );
}

export type SCFabProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default SCFab;
