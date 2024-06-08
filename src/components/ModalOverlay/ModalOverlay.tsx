import styles from "./ModalOverlay.module.css";

export type ModalOverlayProps = {
  onClose: () => void;
};

export const ModalOverlay = ({ onClose }: ModalOverlayProps) => {
  return <div onClick={onClose} className={styles.overlay}></div>;
};

export default ModalOverlay;
