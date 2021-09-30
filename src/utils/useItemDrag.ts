import { useDrag } from 'react-dnd';
import { useStateContext } from '../context/AppStateContext';
import { DragItem } from '../DragItem';
import { setDraggedItem } from '../context/actions';
export const useItemDrag = (item: DragItem) => {
    const { dispatch } = useStateContext();
    const [, drag] = useDrag({
        type: item.type, //card or column
        item: () => {
            dispatch(setDraggedItem(item));
            return item;
        },
        end: () => dispatch(setDraggedItem(null)), //called when the drag is done
    });
    return { drag };
};
