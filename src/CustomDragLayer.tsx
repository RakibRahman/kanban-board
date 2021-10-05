import { useDragLayer } from 'react-dnd';
import { Column } from './Column';
import { CustomDragLayerContainer, DragPreviewWrapper } from './styles';
import { useStateContext } from './context/AppStateContext';
export const CustomDragLayer = () => {
    const { draggedItem } = useStateContext();
    const { currentOffset } = useDragLayer((monitor) => ({
        currentOffset: monitor.getSourceClientOffset(),
    }));
    return draggedItem && currentOffset ? (
        <CustomDragLayerContainer>
            <DragPreviewWrapper position={currentOffset}>
                <Column id={draggedItem.id} text={draggedItem.text} isPreview />
            </DragPreviewWrapper>
        </CustomDragLayerContainer>
    ) : null;
};
