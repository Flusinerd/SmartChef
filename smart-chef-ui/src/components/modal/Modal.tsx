import React, { MouseEventHandler } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = () => {
  return <div className={styles.backdrop}></div>;
};

const ModalOverlay = (props: SCModalProps) => {
  return <div className={styles.modal}>{props.children}</div>;
};

let portalElement = document.getElementById("overlays");
// If the portal element doesn't exist, create it.
if (!portalElement) {
  portalElement = document.createElement("div");
  portalElement.id = "overlays";
  document.body.appendChild(portalElement);
}

const SCModal = ({
  children,
  hideOverlay,
  modaltitle,
  buttons,
  ...rest
}: SCModalProps) => {
  return (
    portalElement && (
      <React.Fragment>
        {ReactDOM.createPortal(
          <Backdrop  />,
          portalElement
        )}
        {ReactDOM.createPortal(
          <ModalOverlay {...rest}>
            <div className={styles["modal-header"]}>{modaltitle}</div>
            <div className={styles["modal-body"]}>{children}</div>
            <div className={styles["modal-footer"]}>{buttons}</div>
          </ModalOverlay>,
          portalElement
        )}
      </React.Fragment>
    )
  );
};

export default SCModal;

export interface SCModalProps extends React.HTMLAttributes<HTMLDivElement> {
  hideOverlay?: MouseEventHandler;
  modaltitle?: React.ReactNode | string;
  buttons?: React.ReactNode;
}
