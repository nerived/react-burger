import { useMemo } from "react";

import { grouptIngridients, IngredientType } from "../../utils";

import { Tabs } from "../Tabs";
import { BurgerIngredientsSection } from "../BurgerIngredientsSection";
import styles from "./BurgerIngredients.module.css";

export const BurgerIngredients = () => {
  const ingredients = useMemo(() => {
    return grouptIngridients();
  }, []);

  return (
    <>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <div className="pt-5" />
      <Tabs />
      <div className="pt-3" />
      <div className={styles.scroll}>
        <div className="pt-7" />

        {(Object.keys(ingredients) as IngredientType[]).map((key) => {
          return (
            <BurgerIngredientsSection
              type={key}
              key={key}
              items={ingredients[key]}
            />
          );
        })}
      </div>
    </>
  );
};

export default BurgerIngredients;
