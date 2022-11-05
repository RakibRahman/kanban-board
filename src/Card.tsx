import { CardContainer } from './styles';
import { useRef } from 'react';
import { useItemDrag } from './utils/useItemDrag';
import { useDrop } from 'react-dnd';
import { useStateContext } from './context/AppStateContext';
import { isHidden } from './utils/isHidden';
import { moveTask } from './context/actions';

type CardProps = {
    text: string;
    id: string;
    columnId: string;
    isPreview?: boolean;
};
export const Card = ({ text, id, columnId, isPreview }: CardProps) => {
    const { draggedItem, dispatch } = useStateContext();
    const ref = useRef<HTMLDivElement>(null);
    const { drag } = useItemDrag({
        type: 'Card',
        id,

        text,
        columnId,
    });
    const [, drop] = useDrop({
        accept: 'Card',
        hover() {
            if (!draggedItem) {
                return;
            }
            if (draggedItem.type !== 'Card') {
                return;
            }
            if (draggedItem.id === id) {
                return;
            }
            console.log(draggedItem);
            dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId));
        },
    });
    drag(drop(ref));
    return (
        <CardContainer isHidden={isHidden(draggedItem, 'Card', id, isPreview)} isPreview={isPreview} ref={ref}>
            {text}
        </CardContainer>
    );
};
