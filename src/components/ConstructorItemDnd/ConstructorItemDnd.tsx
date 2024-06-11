import { useRef } from "react";
import cn from "classnames";
import { useDrop, useDrag } from "react-dnd";

import { ConstructorItem } from "../ConstructorItem";

import styles from "./ConstructorItemDnd.module.css";

export type ConstructorItemDndProps = {
  ingredientId: string;
  index: number;
  moveIngredient: (curIndex: number, nextIndex: number) => void;
};

type DNDItem = {
  index: number;
};

export const ConstructorItemDnd = ({
  ingredientId,
  index,
  moveIngredient,
}: ConstructorItemDndProps) => {
  const ref = useRef<HTMLLIElement | null>(null);

  const [, dropRef] = useDrop<DNDItem, unknown, unknown>({
    accept: "orderIngredient",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
      isOver: monitor.isOver(),
    }),
    hover(item) {
      if (!ref.current) {
        return;
      }

      const curIndex = item.index;
      const nextIndex = index;
      if (curIndex === nextIndex) {
        return;
      }

      moveIngredient(curIndex, nextIndex);
      item.index = nextIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag<
    DNDItem,
    unknown,
    { isDragging: boolean }
  >({
    type: "orderIngredient",
    item: () => {
      return { id: ingredientId, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragRef(dropRef(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <li
      className={cn(styles.item, "pb-4")}
      style={{ opacity }}
      ref={ref}
      draggable
    >
      <ConstructorItem modifyId={ingredientId} />
    </li>
  );
};

export default ConstructorItemDnd;
