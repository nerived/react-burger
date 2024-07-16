import { useEffect } from "react";

import { Modal } from "../Modal";
import { IngredientDetailsContent } from "../IngredientDetailsContent";

export type IngredientDetailsModalProps = {
  handleCloseModal: () => void;
};

export const IngredientDetailsModal = ({
  handleCloseModal,
}: IngredientDetailsModalProps) => {
  useEffect(() => {
    window.addEventListener("keydown", handleCloseModal);

    return () => {
      window.removeEventListener("keydown", handleCloseModal);
    };
  }, [handleCloseModal]);

  return (
    <Modal
      onClose={handleCloseModal}
      header={<h3 className="text text_type_main-large">Детали ингредиента</h3>}
    >
      <IngredientDetailsContent />
    </Modal>
  );
};

export default IngredientDetailsModal;
