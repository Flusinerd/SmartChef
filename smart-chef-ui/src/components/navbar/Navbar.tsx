import styles from "./Navbar.module.css";
import Logo from "./logo.svg";
import { Link } from "react-router-dom";

function SCNavbar(_props: any) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/scan">
          <h1>
            <span className={styles["color-primary"]}>Smart</span>
            Chef
          </h1>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      <ul className={styles.links}>
        <li className={styles.link}>
          <Link to="/scan">Scannen</Link>
        </li>
        <li className={styles["link active"]}>
          <Link to="/shopping-list">Einkaufsliste</Link>
        </li>
        <li className={styles.link}>
          <Link to="/recipes">Rezepte</Link>
        </li>
        <li className={styles.link}>
          <Link to="/settings">Einstellungen</Link>
        </li>
      </ul>
    </nav>
  );
}

export default SCNavbar;
