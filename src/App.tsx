import React from 'react';
import { useStateContext } from './context/AppStateContext';

import { AppContainer } from './styles';
import { Column } from './Column';

import { AddNewItem } from './AddNewItem';
export const App: React.FC = ({ children }) => {
    const { lists } = useStateContext();
    return (
        <AppContainer className="App">
            {lists.map((list) => (
                <Column text={list.text} key={list.id} id={list.id} />
            ))}
            <AddNewItem toggleButtonText="+ Add another list" onAdd={console.log} />
        </AppContainer>
    );
};
