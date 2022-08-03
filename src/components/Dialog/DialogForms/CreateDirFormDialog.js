import React from "react";
import useInput from "../../../hooks/useInput";
import Input from "../../Input/Input";
import FormDialog from "./FormDialog";

function CreateDirFormDialog({ cancelButtonRef, onSubmit, onToggle }) {
  const { value, onChange } = useInput();
  return (
    <FormDialog
      value={value}
      cancelButtonRef={cancelButtonRef}
      onSubmit={onSubmit}
      onToggle={onToggle}
    >
      <Input value={value} name="dir" onChange={onChange} />
    </FormDialog>
  );
}

export default CreateDirFormDialog;
