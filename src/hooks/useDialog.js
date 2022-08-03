import { useState, useRef } from "react";

function useDialog(operation, data) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const handleToggleModal = () => {
    setOpen((prev) => !prev);
  };

  const handleSubmit = (data) => {
    if (!data) return;
    operation(data);
    handleToggleModal();
  };
  return {
    open,
    cancelButtonRef,
    onToggle: handleToggleModal,
    onSubmit: handleSubmit,
  };
}

export default useDialog;
