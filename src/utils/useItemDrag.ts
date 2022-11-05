import { useDrag } from 'react-dnd';
import { useStateContext } from '../context/AppStateContext';
import { DragItem } from '../DragItem';
import { setDraggedItem } from '../context/actions';
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
export const useItemDrag = (item: DragItem) => {
    const { dispatch } = useStateContext();
    const [isDragging, drag, preview] = useDrag({
        type: item.type,
        item: () => {
            dispatch(setDraggedItem(item));
            return item;
        },
        end: () => dispatch(setDraggedItem(null)),
    });
    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);
    return { drag, isDragging };
};
