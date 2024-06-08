import cn from "classnames";
import { useDrop } from "react-dnd";
import { useSelector } from "react-redux";

import { burgerConstructorSelectors } from "../../services";

import { ConstructorItem } from "../ConstructorItem";

import styles from "./BurgerConstructorMiddle.module.css";

export type BurgerConstructorMiddleProps = {
  handleDrop: (item: any) => void;
};

export const BurgerConstructorMiddle = ({
  handleDrop,
}: BurgerConstructorMiddleProps) => {
  const ingredientIds = useSelector(
    burgerConstructorSelectors.getConstructorIngredientIds
  );

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(itemId: any) {
      handleDrop(itemId);
    },
  });

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
          <li key={ingredientId} className={cn(styles.item, "pb-4")}>
            <ConstructorItem modifyId={ingredientId} />
          </li>
        );
      })}
    </ul>
  );
};

export default BurgerConstructorMiddle;
