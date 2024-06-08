import { useMemo } from "react";
import { useSelector } from "react-redux";

import { ingredientsSelectors } from "../../services";
import { Ingredient, IngredientType } from "../../types";
import { ingredientsServices } from "../../services";

import { Tabs } from "../Tabs";
import { BurgerIngredientsSection } from "../BurgerIngredientsSection";

import styles from "./BurgerIngredients.module.css";

export type BurgerIngredientsProps = {
  ingredientsData: Ingredient[];
};

export const BurgerIngredients = () => {
  const ingredientsData = useSelector(ingredientsSelectors.getIngredients);

  const ingredients = useMemo(() => {
    return ingredientsServices.grouptIngredients(ingredientsData);
  }, [ingredientsData]);

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
