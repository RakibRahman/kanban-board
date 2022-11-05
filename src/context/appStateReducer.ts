import { Action } from './actions';
import { nanoid } from 'nanoid';
import { findItemIndexById, moveItem } from './../utils/arrayUtils';
import { DragItem } from '../DragItem';
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
export const appStateReducer = (draft: AppState, action: Action): AppState | void => {
    switch (action.type) {
        case 'Add_List': {
            draft.lists.push({
                id: nanoid(),
                text: action.payload,
                tasks: [],
            });
            break;
        }
        case 'Add_Task': {
            const { text, listId } = action.payload;
            const targetListIndex = findItemIndexById(draft.lists, listId);
            draft.lists[targetListIndex].tasks.push({
                id: nanoid(),
                text,
            });
            break;
        }
        case 'Move_List': {
            const { draggedId, hoverId } = action.payload;
            const dragIndex = findItemIndexById(draft.lists, draggedId);
            const hoverIndex = findItemIndexById(draft.lists, hoverId);
            draft.lists = moveItem(draft.lists, dragIndex, hoverIndex);
            break;
        }
        case 'Move_Task': {
            const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } = action.payload;
            // console.log(action.payload)

            // //! get source and target list
            const sourceListIndex = findItemIndexById(draft.lists, sourceColumnId);
            // console.log(source);
            // const targetListIndex = findItemIndexById(draft.lists, targetColumnId);

            // const dragIndex = findItemIndexById(draft.lists[sourceListIndex].tasks, draggedItemId);

            // const hoverIndex = hoveredItemId ? findItemIndexById(draft.lists[targetListIndex].tasks, hoveredItemId) : 0;
            // //!  return 0 if the index for the hoverId could not be found.

            // const item = draft.lists[sourceListIndex].tasks[dragIndex];
            // //! Remove the task from the source list
            // draft.lists[sourceListIndex].tasks.splice(dragIndex, 1);
            // //! Add the task to the target list
            // draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item);
            break;
        }
        case 'Set_Dragged_Item': {
            draft.draggedItem = action.payload;
            break;
        }
        default: {
            break;
        }
    }
};
