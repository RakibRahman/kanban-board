import React, { useState } from "react";
import { AddItemButton } from "./styles";
import { NewItemForm } from "./NewItemForm";
type AddNewItemProps = {
  dark?: boolean;
  toggleButtonText: string;
  onAdd(text: string): void;
};
export const AddNewItem = (props: AddNewItemProps) => {
  const [showInput, setShowInput] = useState(false);
  const { onAdd, toggleButtonText, dark } = props;

  if (showInput) {
    return (
      <NewItemForm
        onAdd={(text) => {
          onAdd(text);
          setShowInput(false);
        }}
      />
    );
  }

  return (
    <AddItemButton dark={dark} onClick={() => setShowInput(true)}>
      {toggleButtonText}
    </AddItemButton>
  );
};
