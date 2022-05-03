import React, {MouseEventHandler} from "react";
import ReactDOM from "react-dom";

const Backdrop = (props: SCModalProps) => {
  return <div className="backdrop" onClick={props.hideOverlay}></div>;
};

const ModalOverlay = (props: SCModalProps) => {
  return <div className="modal">{props.children}</div>;
};

const portalElement = document.getElementById("overlays")

const SCModal = (props: SCModalProps) => {
    return (
        portalElement &&
        <React.Fragment>
          {ReactDOM.createPortal(
            <Backdrop hideOverlay={props.hideOverlay} />, portalElement
          )}
          {ReactDOM.createPortal(
            <ModalOverlay>{props.children}</ModalOverlay>, portalElement
          )}
        </React.Fragment>
      );
};

export default SCModal;

export interface SCModalProps {
  hideOverlay?: MouseEventHandler; // möglicherweise nicht richtig
  children?: React.ReactNode;
  isShown?: boolean;
}
