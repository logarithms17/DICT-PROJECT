import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ onClose, onLogout }) => {
  const dialog = useRef();

  useEffect(() => {
    dialog.current.showModal();
  });
  return createPortal(
    <dialog
      ref={dialog}
      onClose={onClose}
      className="bg-white p-10 rounded-md flex flex-col gap-10"
    >
      <h1 className="text-3xl font-bold">Are you sure you want to logout?</h1>
      <div className="flex justify-end gap-5">
        <button
          className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
