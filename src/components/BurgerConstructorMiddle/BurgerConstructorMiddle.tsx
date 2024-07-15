import { useCallback } from "react";
import cn from "classnames";
import { useDrop } from "react-dnd";

import { burgerConstructorSelectors, updateSorting } from "../../services";
import { useAppDispatch, useAppSelector } from "../../store";
import { DNDIngredientItem } from "../../types";

import { ConstructorItemDnd } from "../ConstructorItemDnd";

import styles from "./BurgerConstructorMiddle.module.css";

export type BurgerConstructorMiddleProps = {
  handleDrop: (item: DNDIngredientItem) => void;
};

export const BurgerConstructorMiddle = ({
  handleDrop,
}: BurgerConstructorMiddleProps) => {
  const ingredientIds = useAppSelector(
    burgerConstructorSelectors.getConstructorIngredientIds
  );
  const dispatch = useAppDispatch();

  const [{ isHover }, dropTarget] = useDrop<
    DNDIngredientItem,
    unknown,
    { isHover: boolean }
  >({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(itemId) {
      handleDrop(itemId);
    },
  });

  const moveIngredient = useCallback(
    (curIndex: number, nextIndex: number) => {
      const updateFilling = [...ingredientIds];
      updateFilling.splice(nextIndex, 0, updateFilling.splice(curIndex, 1)[0]);

      dispatch(updateSorting(updateFilling));
    },
    [ingredientIds, dispatch]
  );

  if (!ingredientIds.length) {
    return (
      <div className={styles.empty} ref={dropTarget}>
        <p
          className={cn(
            styles.emptyContent,
            isHover && styles.highlight,
            "text text_type_main-default"
          )}
        >
          Перетяните желаемые ингредиенты
        </p>
      </div>
    );
  }

  return (
    <ul
      className={cn(styles.list, isHover && styles.highlight, "pl-4 pr-4 ")}
      ref={dropTarget}
    >
      {ingredientIds.map((ingredientId, index) => {
        return (
          <ConstructorItemDnd
            key={ingredientId}
            ingredientId={ingredientId}
            index={index}
            moveIngredient={moveIngredient}
          />
        );
      })}
    </ul>
  );
};

export default BurgerConstructorMiddle;
