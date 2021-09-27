import { ColumnContainer, ColumnTitle } from "./styles";
import { FC } from "react";
type ColumnProps = {
  text: string;
};
//! React.FC type to define the children prop on component.

export const Column: FC<ColumnProps> = ({ text, children }) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
    </ColumnContainer>
  );
};
