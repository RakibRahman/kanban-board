import React, { useEffect } from "react";
import { useStateContext } from "./context/AppStateContext";

import { AppContainer } from "./styles";
import { Column } from "./components/Column/Column";

import { AddNewItem } from "./components/AddNewItem";
import { addList } from "./context/actions";
import { CustomDragLayer } from "./CustomDragLayer";
export const App: React.FC = ({ children }) => {
  useEffect(() => {
    document.title = "Kanban Board";
  }, []);
  const { lists, dispatch } = useStateContext();

  useEffect(() => {
    console.log(lists);
  }, [lists]);
  return (
    <AppContainer className="App">
      <CustomDragLayer />
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  );
};
