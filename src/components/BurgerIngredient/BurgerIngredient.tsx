import { useState } from "react";
import cn from "classnames";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientData } from "../../utils";

import { Modal } from "../Modal";
import { IngredientDetails } from "../IngredientDetails";

import styles from "./BurgerIngredient.module.css";

export const BurgerIngredient = (props: IngredientData) => {
  const [isShowIngridientModal, setIsShowIngridientModal] = useState(false);
  const { price, name, proteins, image } = props;

  const handleOpenModal = () => {
    setIsShowIngridientModal(true);
  };

  const handleCloseModal = () => {
    setIsShowIngridientModal(false);
  };

  const ingridientModal = (
    <Modal
      onClose={handleCloseModal}
      header={<h3 className="text text_type_main-large">Детали ингредиента</h3>}
    >
      <IngredientDetails {...props} />
    </Modal>
  );

  return (
    <>
      <section className={styles.item} onClick={handleOpenModal}>
        <Counter count={proteins} size="default" />
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
      {isShowIngridientModal && ingridientModal}
    </>
  );
};

export default BurgerIngredient;
