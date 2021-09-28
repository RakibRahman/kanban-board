import React from 'react';

import { AppContainer } from './styles';

export const App: React.FC = ({ children }) => {
    return (
        <AppContainer className="App">
            <h1 className="App-header">Hello TypeScript!</h1>
            <p>Hello</p>
        </AppContainer>
    );
};
