import React, { useEffect } from 'react';
import { useStateContext } from './context/AppStateContext';

import { AppContainer } from './styles';
import { Column } from './Column';

import { AddNewItem } from './AddNewItem';
import { addList } from './context/actions';
export const App: React.FC = ({ children }) => {
    useEffect(() => {
        document.title = 'Kanban Board';
    }, []);
    const { lists, dispatch } = useStateContext();
    return (
        <AppContainer className="App">
            {lists.map((list) => (
                <Column text={list.text} key={list.id} id={list.id} />
            ))}
            <AddNewItem toggleButtonText="+ Add another list" onAdd={(text) => dispatch(addList(text))} />
        </AppContainer>
    );
};
