import { ColumnContainer, ColumnTitle } from './styles';
import { FC } from 'react';
import { AddNewItem } from './AddNewItem';
type ColumnProps = {
    text: string;
};
//! React.FC type to define the children prop on component.

export const Column: FC<ColumnProps> = ({ text, children }) => {
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {children}
            <AddNewItem toggleButtonText="➕ Add Another Task" onAdd={console.log} dark />
        </ColumnContainer>
    );
};
