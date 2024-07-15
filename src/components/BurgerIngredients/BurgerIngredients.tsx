import { useMemo, useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";

import { useAppSelector } from "../../store";
import { ingredientsSelectors } from "../../services";
import { Ingredient, IngredientType, TABS } from "../../types";
import { ingredientsServices } from "../../services";

import { Tabs } from "../Tabs";
import { BurgerIngredientsSection } from "../BurgerIngredientsSection";

import styles from "./BurgerIngredients.module.css";

export type BurgerIngredientsProps = {
  ingredientsData: Ingredient[];
};

export const BurgerIngredients = () => {
  const [current, setCurrent] = useState<IngredientType>(TABS[0]);
  const ingredientsData = useAppSelector(ingredientsSelectors.getIngredients);

  const [sectionBunRef, inViewBun] = useInView({ threshold: 0.05 });
  const [sectionSaucesRef, inViewSauce] = useInView({ threshold: 0.05 });
  const [sectionMainRef, inViewMain] = useInView({ threshold: 0.05 });

  const ingredients = useMemo(() => {
    return ingredientsServices.grouptIngredients(ingredientsData);
  }, [ingredientsData]);

  const refsMap = useMemo(() => {
    return {
      [IngredientType.BUNN]: sectionBunRef,
      [IngredientType.SAUCE]: sectionSaucesRef,
      [IngredientType.MAIN]: sectionMainRef,
    };
  }, [sectionBunRef, sectionSaucesRef, sectionMainRef]);

  useEffect(() => {
    if (inViewBun) {
      setCurrent(IngredientType.BUNN);
    } else if (inViewSauce) {
      setCurrent(IngredientType.SAUCE);
    } else if (inViewMain) {
      setCurrent(IngredientType.MAIN);
    }
  }, [inViewBun, inViewSauce, inViewMain]);

  const handleTabClick = useCallback((tab: string) => {
    setCurrent(tab as IngredientType);
    document
      .querySelector(`#section-${tab}`)
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <h2 className="text text_type_main-large">Соберите бургер</h2>
      <div className="pt-5" />
      <Tabs current={current} setCurrent={handleTabClick} />
      <div className="pt-3" />
      <div className={styles.scroll}>
        <div className="pt-7" />

        {(Object.keys(ingredients) as IngredientType[]).map((key) => {
          return (
            <BurgerIngredientsSection
              type={key}
              key={key}
              items={ingredients[key]}
              ref={refsMap[key]}
            />
          );
        })}
      </div>
    </>
  );
};

export default BurgerIngredients;
