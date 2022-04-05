import React from 'react';
import './Navbar.css';
import Logo from './logo.svg';

export function SCNavbar(props: any) {
  return (

    <nav className="navbar">
      <div className="logo">
        <a href="#">
          <h1>
            <span className="color-primary">Smart</span>
            Chef
          </h1>
          <img src={Logo} alt="Logo" />
        </a>
      </div>

      <ul className="links">
        <li className="link"><a>Scannen</a></li>
        <li className="link active"><a>Einkaufsliste</a></li>
        <li className="link"><a>Rezepte</a></li>
        <li className="link"><a>Einstellung</a></li>
      </ul>
    </nav>

  );
}
