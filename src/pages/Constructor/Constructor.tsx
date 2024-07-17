import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import cn from "classnames";

import { useAppDispatch } from "../../store";
import { ingredientsThunks } from "../../services";

import { BurgerConstructor } from "../../components/BurgerConstructor";
import { BurgerIngredients } from "../../components/BurgerIngredients";
import { PageLayout } from "../../components/PageLayout";

import styles from "./Constructor.module.css";

export const Constructor = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ingredientsThunks.fetchIngredients());
  }, [dispatch]);

  return (
    <PageLayout>
      <DndProvider backend={HTML5Backend}>
        <div className={cn(styles.left, "pl-5 pr-5 pt-10")}>
          <BurgerIngredients />
        </div>
        <div className={cn(styles.right, "pl-5 pr-5")}>
          <BurgerConstructor />
        </div>
      </DndProvider>
    </PageLayout>
  );
};

export default Constructor;
