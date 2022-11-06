import { useRef } from "react";
import { useDrop } from "react-dnd";
import { moveTask } from "../../context/actions";
import { useStateContext } from "../../context/AppStateContext";
import { CardContainer } from "../../styles";
import { isHidden } from "../../utils/isHidden";
import { useItemDrag } from "../../utils/useItemDrag";

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
    type: "Card",
    id,
    text,
    columnId,
  });
  const [, drop] = useDrop({
    accept: "Card",
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type !== "Card") {
        return;
      }
      if (draggedItem.id === id) {
        return;
      }
      dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId));
    },
  });
  drag(drop(ref));

  return (
    <CardContainer
      isHidden={isHidden(draggedItem, "Card", id, isPreview)}
      isPreview={isPreview}
      ref={ref}
    >
      {text}
    </CardContainer>
  );
};
