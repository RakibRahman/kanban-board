import { DragItem } from "../models/DragItem";

export type Action =
  | { type: "Add_List"; payload: string }
  | { type: "Add_Task"; payload: { text: string; listId: string } }
  | { type: "Move_List"; payload: { draggedId: string; hoverId: string } }
  | {
      type: "Set_Dragged_Item";
      payload: DragItem | null;
    }
  | {
      type: "Move_Task";
      payload: {
        draggedItemId: string;
        hoveredItemId: string | null;
        sourceColumnId: string;
        targetColumnId: string;
      };
    };

export const addTask = (text: string, listId: string): Action => ({
  type: "Add_Task",
  payload: {
    text,
    listId,
  },
});
export const addList = (text: string): Action => ({
  type: "Add_List",
  payload: text,
});
export const moveList = (draggedId: string, hoverId: string): Action => ({
  type: "Move_List",
  payload: {
    draggedId,
    hoverId,
  },
});
export const setDraggedItem = (draggedItem: DragItem | null): Action => ({
  type: "Set_Dragged_Item",
  payload: draggedItem,
});
export const moveTask = (
  draggedItemId: string,
  hoveredItemId: string | null,
  sourceColumnId: string,
  targetColumnId: string
): Action => ({
  type: "Move_Task",
  payload: {
    draggedItemId,
    hoveredItemId,
    sourceColumnId,
    targetColumnId,
  },
});
