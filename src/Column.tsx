import { ColumnContainer, ColumnTitle } from './styles';
import { useRef, useEffect } from 'react';
import { useItemDrag } from './utils/useItemDrag';
import { isHidden } from './utils/isHidden';
import { AddNewItem } from './AddNewItem';
import { useStateContext } from './context/AppStateContext';
import { addTask, moveTask, moveList, setDraggedItem } from './context/actions';
import { Card } from './Card';
import { useDrop } from 'react-dnd';
import { DragItem } from './DragItem';
import { useAutoAnimate } from '@formkit/auto-animate/react'

type ColumnProps = {
    text: string;
    id: string;
    isPreview?: boolean;
};
//! React.FC type to define the children prop on component.

export const Column = ({ text, id, isPreview }: ColumnProps) => {
    const { draggedItem, getTasksByListId, dispatch } = useStateContext();
    const tasks = getTasksByListId(id);
    const ref = useRef<HTMLDivElement>(null);
    const [, drop] = useDrop({
        accept: ['Column', 'Card'],
        hover(item: DragItem) {
            if (!draggedItem) {
                return;
            }
            if (draggedItem.type === 'Column') {
                if (draggedItem.id === id) {
                    return;
                }
                dispatch(moveList(draggedItem.id, id));
            } else {
                if (draggedItem.columnId === id) {
                    return;
                }
                if (tasks.length) {
                    return;
                }
                dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
                dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
            }
        },
    });
    const { drag, isDragging } = useItemDrag({ type: 'Column', id, text });
    drag(drop(ref));
    const [cardList] = useAutoAnimate<HTMLDivElement>(/* optional config */)
    useEffect(() => {

        console.log(isDragging);
    }, [isDragging])
    return (
        <ColumnContainer isPreview={isPreview} ref={ref} isHidden={isHidden(draggedItem, 'Column', id, isPreview)}>
            <ColumnTitle>{text}</ColumnTitle>
            <div ref={draggedItem ? null : cardList}>
                {tasks.map((task) => (
                    <Card text={task.text} id={task.id} key={task.id} columnId={id} />
                ))}
            </div>
            <AddNewItem toggleButtonText="➕ Add Another Task" onAdd={(text) => dispatch(addTask(text, id))} dark />
        </ColumnContainer>
    );
};
