import { useEffect, useCallback } from "react";

import { Modal } from "../Modal";
import { IngredientDetailsContent } from "../IngredientDetailsContent";

export type IngredientDetailsModalProps = {
  handleCloseModal: () => void;
};

export const IngredientDetailsModal = ({
  handleCloseModal,
}: IngredientDetailsModalProps) => {
  const handleEscapePress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    },
    [handleCloseModal]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEscapePress);

    return () => {
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [handleEscapePress]);

  return (
    <Modal
      onClose={handleCloseModal}
      header={<h3 className="text text_type_main-large">Детали ингредиента</h3>}
      testId="ingredient"
    >
      <IngredientDetailsContent />
    </Modal>
  );
};

export default IngredientDetailsModal;
