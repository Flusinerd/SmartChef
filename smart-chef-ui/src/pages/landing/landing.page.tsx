import React from "react";
import { SCButton } from "../../components/button/button";
import "./landingpage.css";
import Image1 from "./images/image1.svg";
import Image2 from "./images/image2.svg";
import Image3 from "./images/image3.svg";
import BGImage from "./images/background.svg";
import { Link } from "react-router-dom";

export function SCLandingPage(): React.ReactElement {
  return (
    <div className="wrapper">
      <img src={BGImage} alt="" id="bg-image" />
      <div className="header">
        <h1>
          <span className="color-primary">Smart</span>
          Chef
        </h1>

        <Link to="/login">
          <SCButton id="desktop-btn">Anmelden</SCButton>
        </Link>
      </div>

      {/* Main Content */}
      <div className="content">
        <p id="text1">
          Erstell dir deine individuelle Smarte Einkaufsliste mit SmartChef
        </p>
        <p id="text2">
          Scanne deine Lieblingsprodukte mit deinem Handy ein und lasse dir auf
          SmartChef anzeigen, was du dir damit kochen kannst
        </p>
        <p id="text3">
          Erstelle zusammen mit deinen Freunden oder deiner Familie eine
          gemeinsame Einkaufsliste
        </p>
        <img src={Image1} alt="" id="image1"></img>
        <img src={Image2} alt="" id="image2"></img>
        <img src={Image3} alt="" id="image3"></img>
      </div>
      <div id="mobile-btn">
        <Link to="/login">
          <SCButton>Anmelden</SCButton>
        </Link>
      </div>
    </div>
  );
}
