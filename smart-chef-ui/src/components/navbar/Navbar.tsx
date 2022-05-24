import styles from "./Navbar.module.css";
import Logo from "./logo.svg";
import { NavLink } from "react-router-dom";

function SCNavbar(_props: any) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <NavLink to="/scan">
          <h1 className={styles.name}>
            <span className={styles["color-primary"]}>Smart</span>
            Chef
          </h1>
          <img src={Logo} alt="Logo" className={styles.logoImg} />
        </NavLink>
      </div>

      <ul className={styles.links}>
        <li className={styles.link}>
          <NavLink to="/scan">Scannen</NavLink>
        </li>
        <li className={styles["link active"]}>
          <NavLink to="/shopping-list">Einkaufsliste</NavLink>
        </li>
        <li className={styles.link}>
          <NavLink to="/recipes">Rezepte</NavLink>
        </li>
        <li className={styles.link}>
          <NavLink to="/settings">Einstellungen</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SCNavbar;
