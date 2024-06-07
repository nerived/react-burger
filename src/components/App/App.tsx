import cn from "classnames";

import { AppHeader } from "../AppHeader";
import { BurgerConstructor } from "../BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients";

import styles from "./App.module.css";

export const App = () => {
  return (
    <>
      <AppHeader />
      <main className={cn(styles.main, "pb-4")}>
        <div className={cn(styles.left, "pl-5 pr-5 pt-10")}>
          <BurgerIngredients />
        </div>
        <div className={cn(styles.right, "pl-5 pr-5")}>
          <BurgerConstructor />
        </div>
      </main>
    </>
  );
};

export default App;
