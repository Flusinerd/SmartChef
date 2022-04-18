import "./loginpage.module.css";
import BgImage from "../../assets/images/background.svg";

function SCLoginPage() {
  return (
    <div className="wrapper">
      <h1>
        <span className="color-primary">Smart</span>Chef
      </h1>
      <img src={BgImage} alt="" className="sc-bg-image" />
    </div>
  );
}

export default SCLoginPage;
