import { useState, useEffect, useRef } from "react";
import { NewItemFormContainer, NewItemInput, NewItemButton } from "../styles";
type NewItemFormProps = {
  onAdd(text: string): void;
};
export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const handleAddText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAdd(text);
      console.log(text);
    }
  };
  return (
    <NewItemFormContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleAddText}
      />
      ;<NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>;
    </NewItemFormContainer>
  );
};
