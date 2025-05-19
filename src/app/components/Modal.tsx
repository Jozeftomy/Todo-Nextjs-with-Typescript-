'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (isOpen && dialog && !dialog.open) {
      dialog.showModal();
      dialog.classList.add("modal-open");
    } else if (!isOpen && dialog && dialog.open) {
      dialog.close();
      dialog.classList.remove("modal-open");
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} id="my_modal_3" className="modal" onClose={onClose}>
      <div className="modal-box">
        <form method="dialog">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
