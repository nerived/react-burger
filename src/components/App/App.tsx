import { useEffect } from "react";
import cn from "classnames";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useAppDispatch } from "../../store";
import { ingredientsThunks } from "../../services";

import { AppHeader } from "../AppHeader";
import { BurgerConstructor } from "../BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients";

import styles from "./App.module.css";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ingredientsThunks.fetchIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <AppHeader />
      <main className={cn(styles.main, "pb-4")}>
        <div className={cn(styles.left, "pl-5 pr-5 pt-10")}>
          <BurgerIngredients />
        </div>
        <div className={cn(styles.right, "pl-5 pr-5")}>
          <BurgerConstructor />
        </div>
      </main>
    </DndProvider>
  );
};

export default App;
