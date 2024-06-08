import cn from "classnames";

import { Ingredient, IngredientType, TYPE_TO_NAME } from "../../types";

import { BurgerIngredient } from "../BurgerIngredient";

import styles from "./BurgerIngredientsSection.module.css";

export type BurgerIngredientsSectionProps = {
  type: IngredientType;
  items: Ingredient[];
};

export const BurgerIngredientsSection = ({
  type,
  items,
}: BurgerIngredientsSectionProps) => {
  return (
    <>
      <h3 className="text text_type_main-medium">{TYPE_TO_NAME[type]}</h3>
      <ul className={cn(styles.list, "pl-1 pr-1 pt-3 pb-5")}>
        {items.map((item) => {
          return (
            <li className={cn(styles.item, "p-3 pb-5")} key={item._id}>
              <BurgerIngredient {...item} />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default BurgerIngredientsSection;
