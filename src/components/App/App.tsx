import { useCallback, useEffect, useState } from "react";
import cn from "classnames";

import { findIngridientById, IngredientData } from "../../utils";
import { API_INGRIDIENTS } from "../../constants";

import { AppHeader } from "../AppHeader";
import { BurgerConstructor } from "../BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients";

import styles from "./App.module.css";

export const App = () => {
  const [ingredientsData, setIngredientsData] = useState<IngredientData[]>([]);

  const getApiData = async () => {
    const response = await fetch(API_INGRIDIENTS).then((response) =>
      response.json()
    );

    if (response?.data) {
      setIngredientsData(response?.data);
    }
  };

  const getIngridientById = useCallback(
    (id: string) => {
      return findIngridientById(ingredientsData, id);
    },
    [ingredientsData]
  );

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <AppHeader />
      <main className={cn(styles.main, "pb-4")}>
        <div className={cn(styles.left, "pl-5 pr-5 pt-10")}>
          <BurgerIngredients ingredientsData={ingredientsData} />
        </div>
        <div className={cn(styles.right, "pl-5 pr-5")}>
          <BurgerConstructor getIngridientById={getIngridientById} />
        </div>
      </main>
    </>
  );
};

export default App;
