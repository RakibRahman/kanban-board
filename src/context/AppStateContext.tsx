import { createContext, useContext, FC, Dispatch } from 'react';
import { appStateReducer, AppState, List, Task } from './appStateReducer';
import { Action } from './actions';
import { useImmerReducer } from 'use-immer';
import { DragItem } from '../DragItem';

const appData: AppState = {
    draggedItem: null,
    lists: [
        {
            id: '0',
            text: 'To DO',
            tasks: [{ id: 'c0', text: 'Make typescript Project' }],
        },
        {
            id: '1',
            text: 'In Progress',
            tasks: [{ id: 'c2', text: 'Learn Typescript' }],
        },
        {
            id: '2',
            text: 'Done',
            tasks: [{ id: 'c3', text: 'Basics of TS' }],
        },
    ],
};

type AppStateContextProps = {
    lists: List[];
    getTasksByListId(id: string): Task[];
    dispatch: Dispatch<Action>;
    draggedItem: DragItem | null;
};
const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);
export const useStateContext = () => {
    return useContext(AppStateContext);
};
export const AppStateProvider: FC = ({ children }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, appData);
    const { draggedItem, lists } = state;
    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || [];
    };
    return (
        <AppStateContext.Provider value={{ draggedItem, lists, getTasksByListId, dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
};
