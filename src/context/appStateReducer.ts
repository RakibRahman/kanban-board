import { Action } from "./actions";
import { nanoid } from "nanoid";
import { findItemIndexById, moveItem } from "./../utils/arrayUtils";
import { DragItem } from "../models/DragItem";
export type Task = {
  id: string;
  text: string;
};
export type List = {
  id: string;
  text: string;
  tasks: Task[];
};

export type AppState = {
  lists: List[];
  draggedItem: DragItem | null;
};
export const appStateReducer = (
  draft: AppState,
  action: Action
): AppState | void => {
  switch (action.type) {
    case "Add_List": {
      draft.lists.push({
        id: nanoid(),
        text: action.payload,
        tasks: [],
      });
      break;
    }
    case "Add_Task": {
      const { text, listId } = action.payload;
      const targetListIndex = findItemIndexById(draft.lists, listId);
      draft.lists[targetListIndex].tasks.push({
        id: nanoid(),
        text,
      });
      break;
    }
    case "Move_List": {
      const { draggedId, hoverId } = action.payload;
      const dragIndex = findItemIndexById(draft.lists, draggedId);
      const hoverIndex = findItemIndexById(draft.lists, hoverId);
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex);
      break;
    }
    case "Move_Task": {
      const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } =
        action.payload;
      console.log({ hoveredItemId });
      //! get source and target list
      const sourceListIndex = findItemIndexById(draft.lists, sourceColumnId);
      const targetListIndex = findItemIndexById(draft.lists, targetColumnId);
      const sourceTaskList = draft.lists[sourceListIndex].tasks;
      const targetTaskList = draft.lists[targetListIndex].tasks;

      const dragIndex = findItemIndexById(
        draft.lists[sourceListIndex].tasks,
        draggedItemId
      );

      const hoverIndex = hoveredItemId
        ? findItemIndexById(targetTaskList, hoveredItemId)
        : 0;
      console.log({ hoverIndex });
      //!  return 0 if the index for the hoverId could not be found.

      const item = sourceTaskList[dragIndex];
      console.log({ item });
      if (item === undefined) {
        return;
      }
      //! Remove the task from the source list
      sourceTaskList.splice(dragIndex, 1);
      //! Add the task to the target list
      targetTaskList.splice(hoverIndex, 0, item);

      console.log("---");
      console.log({
        sourceTaskList,
        targetTaskList,
      });
      break;
    }
    case "Set_Dragged_Item": {
      draft.draggedItem = action.payload;
      break;
    }
    default: {
      break;
    }
  }
};
