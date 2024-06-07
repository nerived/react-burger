import ReactDOM from "react-dom";
import cn from "classnames";

import { ModalHeader } from "../ModalHeader";
import { ModalOverlay } from "../ModalOverlay";
import styles from "./Modal.module.css";

const modalRoot = document.getElementById("modal");

export const Modal = ({ children, header, onClose }: any) => {
  return ReactDOM.createPortal(
    <div className={styles.root}>
      <ModalOverlay onClose={onClose} />
      <div className={cn(styles.modal, "p-10")}>
        <ModalHeader onClose={onClose}>{header}</ModalHeader>
        {children}
      </div>
    </div>,
    modalRoot as HTMLElement
  );
};

export default Modal;
