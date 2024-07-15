import { Modal } from "../Modal";
import { IngredientDetailsContent } from "../IngredientDetailsContent";

export type IngredientDetailsModalProps = {
  handleCloseModal: () => void;
};

export const IngredientDetailsModal = ({
  handleCloseModal,
}: IngredientDetailsModalProps) => {
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
