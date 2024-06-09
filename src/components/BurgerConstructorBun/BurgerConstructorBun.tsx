import cn from "classnames";
import { useDrop } from "react-dnd";

import { DNDIngredientItem } from "../../types";

import { ConstructorItem, ConstructorItemProps } from "../ConstructorItem";

import styles from "./BurgerConstructorBun.module.css";

export type BurgerConstructorBunProps = {
  bunId: string;
  type: ConstructorItemProps["type"];
  prefix: string;
  handleDrop: (item: DNDIngredientItem) => void;
};

export const BurgerConstructorBun = ({
  bunId,
  type,
  prefix,
  handleDrop,
}: BurgerConstructorBunProps) => {
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

  return (
    <section className={cn(styles.start, "pl-4 pr-4 pb-4")} ref={dropTarget}>
      <ConstructorItem
        type={type}
        modifyId={bunId}
        prefix={prefix}
        extraClass={isHover ? styles.highlight : ""}
      />
    </section>
  );
};

export default BurgerConstructorBun;
