import { useState, useEffect, useCallback } from "react";

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleEscapePress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener("keydown", handleEscapePress);
    }

    return () => {
      if (isModalOpen) {
        window.removeEventListener("keydown", handleEscapePress);
      }
    };
  }, [handleEscapePress, isModalOpen]);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
