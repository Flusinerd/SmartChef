import React, {MouseEventHandler} from "react";
import ReactDOM from "react-dom";

const Backdrop = (props: SCModalProps) => {
  return <div className="backdrop" onClick={props.hideOverlay}></div>;
};

const ModalOverlay = (props: SCModalProps) => {
  return <div className="modal">{props.children}</div>;
};

const SCModal = (props: SCModalProps) => {
    const modal = (
        <React.Fragment>
            <Backdrop hideOverlay={props.hideOverlay} />
            <ModalOverlay>{props.children}</ModalOverlay>
        </React.Fragment>
      );

      return props.isShown ? ReactDOM.createPortal(modal, document.body) : null;
};

export default SCModal;

export interface SCModalProps {
  hideOverlay?: MouseEventHandler; // möglicherweise nicht richtig
  children?: React.ReactNode;
  isShown?: boolean;
}
