import { ColumnContainer, ColumnTitle } from './styles';

import { AddNewItem } from './AddNewItem';
import { useStateContext } from './context/AppStateContext';
import { addTask } from './context/actions';
import { Card } from './Card';
type ColumnProps = {
    text: string;
    id: string;
};
//! React.FC type to define the children prop on component.

export const Column = ({ text, id }: ColumnProps) => {
    const { getTasksByListId, dispatch } = useStateContext();
    const tasks = getTasksByListId(id);
    return (
        <ColumnContainer>
            <ColumnTitle>{text}</ColumnTitle>
            {tasks.map((task) => (
                <Card text={task.text} id={task.id} key={task.id} />
            ))}
            <AddNewItem toggleButtonText="➕ Add Another Task" onAdd={(text) => dispatch(addTask(text, id))} dark />
        </ColumnContainer>
    );
};
