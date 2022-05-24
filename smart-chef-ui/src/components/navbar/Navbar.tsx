import "./Navbar.css";
import Logo from "./logo.svg";
import { NavLink } from "react-router-dom";

function SCNavbar(_props: any) {
  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/scan">
          <h1>
            <span className="color-primary">Smart</span>
            Chef
          </h1>
          <img src={Logo} alt="Logo" />
        </NavLink>
      </div>

      <ul className="links">
        <li className="link">
          <NavLink to="/scan">Scannen</NavLink>
        </li>
        <li className="link active">
          <NavLink to="/shopping-list">Einkaufsliste</NavLink>
        </li>
        <li className="link">
          <NavLink to="/recipes">Rezepte</NavLink>
        </li>
        <li className="link">
          <NavLink to="/settings">Einstellungen</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SCNavbar;
