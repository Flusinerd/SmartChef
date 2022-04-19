import FabSvg from "./fab.svg";
import "./Fab.css";

function SCFab() {
  const showModal = () => {};

  return (
    <div className="scfab" onClick={showModal}>
      <img src={FabSvg} alt="FabSvg" />
    </div>
  );
}

export default SCFab;
