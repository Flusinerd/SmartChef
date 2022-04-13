import "./Navbar.css";
import Logo from "./logo.svg";
import { Link } from "react-router-dom";

function SCNavbar(_props: any) {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/scan">
          <h1>
            <span className="color-primary">Smart</span>
            Chef
          </h1>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      <ul className="links">
        <li className="link">
          <Link to="/scan">Scannen</Link>
        </li>
        <li className="link active">
          <Link to="/shopping-list">Einkaufsliste</Link>
        </li>
        <li className="link">
          <Link to="/recipes">Rezepte</Link>
        </li>
        <li className="link">
          <Link to="/settings">Einstellungen</Link>
        </li>
      </ul>
    </nav>
  );
}

export default SCNavbar;
