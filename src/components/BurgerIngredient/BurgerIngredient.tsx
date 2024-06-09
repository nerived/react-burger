import { useCallback } from "react";
import cn from "classnames";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

import { useAppDispatch } from "../../store";
import { useModal } from "../../hooks";
import { Ingredient, DNDIngredientItem } from "../../types";
import { resetIngredientDetails, addIngredientDetails } from "../../services";

import { IngredientDetails } from "../IngredientDetails";

import styles from "./BurgerIngredient.module.css";

export const BurgerIngredient = (props: Ingredient) => {
  const { price, name, image, count = 0, _id, type } = props;
  const dispatch = useAppDispatch();

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleCloseModal = useCallback(() => {
    closeModal();
    dispatch(resetIngredientDetails());
  }, [closeModal, dispatch]);

  const handleOpenModal = () => {
    dispatch(addIngredientDetails(props));
    openModal();
  };

  const [{ opacity }, drag] = useDrag<
    DNDIngredientItem,
    unknown,
    { opacity: number }
  >({
    type: "ingredient",
    item: { id: _id, type, count },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <>
      <section
        className={styles.item}
        onClick={handleOpenModal}
        draggable
        ref={drag}
        style={{ opacity }}
      >
        {!!count && <Counter count={count} size="default" />}
        <div className={cn(styles.img, "pl-4 pr-4")}>
          <img src={image} alt={name} />
        </div>
        <div
          className={cn(
            styles.price,
            "pt-1 pb-1 text text_type_digits-default"
          )}
        >
          {price} <CurrencyIcon type="primary" />
        </div>
        <div className={cn(styles.title, "text text_type_main-default")}>
          {name}
        </div>
      </section>
      {isModalOpen && <IngredientDetails handleCloseModal={handleCloseModal} />}
    </>
  );
};

export default BurgerIngredient;
