import { useState } from "react";

export function useLogoutModal(onConfirm?: () => void) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const confirmLogout = () => {
    if (onConfirm) onConfirm();
    setIsOpen(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    confirmLogout,
  };
}