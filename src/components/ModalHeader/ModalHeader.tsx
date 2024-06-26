import { JSX } from "react";
import cn from "classnames";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ModalHeader.module.css";

export type ModalHeaderProps = {
  children?: JSX.Element;
  onClose: () => void;
};

export const ModalHeader = ({ children, onClose }: ModalHeaderProps) => {
  return (
    <div className={cn(styles.header, "pt-2 pb-2")}>
      {children}
      <button type="button" className={styles.close} onClick={onClose}>
        <CloseIcon type="primary" />
      </button>
    </div>
  );
};

export default ModalHeader;
