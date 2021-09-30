export type Action =
    | { type: 'Add_List'; payload: string }
    | { type: 'Add_Task'; payload: { text: string; listId: string } };

export const addTask = (text: string, listId: string): Action => ({
    type: 'Add_Task',
    payload: {
        text,
        listId,
    },
});
export const addList = (text: string): Action => ({
    type: 'Add_List',
    payload: text,
});
