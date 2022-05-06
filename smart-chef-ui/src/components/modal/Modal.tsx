import React, {MouseEventHandler} from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props: SCModalProps) => {
  return <div className={styles.backdrop} onClick={props.hideOverlay}></div>;
};

const ModalOverlay = (props: SCModalProps) => {
  return <div className={styles.modal}>{props.children}</div>;
};

const portalElement = document.getElementById("overlays")

const SCModal = ({children, hideOverlay, ...rest} : SCModalProps) => {
    return (
        portalElement &&
        <React.Fragment>
          {ReactDOM.createPortal(
            <Backdrop hideOverlay={hideOverlay} />, portalElement
          )}
          {ReactDOM.createPortal(
            <ModalOverlay {...rest}>
                <div className={styles["modal-header"]}>
                    {rest.title}
                </div>
                <div className={styles["modal-body"]}>
                    {children}
                </div>
                <div className={styles["modal-footer"]}>
                    {rest.buttons}
                </div>
                </ModalOverlay>, portalElement
          )}
        </React.Fragment>
      );
};

export default SCModal;

export interface SCModalProps extends React.HTMLAttributes<HTMLDivElement> {
  hideOverlay?: MouseEventHandler; // möglicherweise nicht richtig
  children?: React.ReactNode;
  title?: string;
  isShown?: boolean;
  buttons?: React.ReactNode;
}
