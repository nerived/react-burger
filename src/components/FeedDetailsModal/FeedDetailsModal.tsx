import { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Modal } from "../Modal";
import { FeedDetailsContent } from "../FeedDetailsContent";

export type FeedDetailsModalProps = {
  handleCloseModal: () => void;
};

export const FeedDetailsModal = ({
  handleCloseModal,
}: FeedDetailsModalProps) => {
  const { id } = useParams<{ id: string }>();

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
      header={<h3 className="text text_type_digits-default">#{id}</h3>}
    >
      <FeedDetailsContent isModal />
    </Modal>
  );
};

export default FeedDetailsModal;
