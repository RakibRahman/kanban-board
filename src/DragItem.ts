export type CardDragItem = {
    id: string;
    columnId: string;
    text: string;
    type: 'Card';
};

export type ColumnDragItem = {
    id: string;
    text: string;
    type: 'Column';
};

export type DragItem = CardDragItem | ColumnDragItem;
