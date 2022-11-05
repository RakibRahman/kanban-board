import { useDragLayer } from 'react-dnd';
import { Column } from './Column';
import { Card } from './Card';
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
                {draggedItem.type === 'Column' ? (
                    <Column id={draggedItem.id} text={draggedItem.text} isPreview />
                ) : (
                    <Card columnId={draggedItem.columnId} isPreview id={draggedItem.id} text={draggedItem.text} />
                )}
            </DragPreviewWrapper>
        </CustomDragLayerContainer>
    ) : null;
};
