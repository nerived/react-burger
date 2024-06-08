import cn from "classnames";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientData } from "../../utils";
import { useModal } from "../../hooks";

import { Modal } from "../Modal";
import { IngredientDetails } from "../IngredientDetails";

import styles from "./BurgerIngredient.module.css";

export const BurgerIngredient = (props: IngredientData) => {
  const { price, name, proteins, image } = props;
  const { isModalOpen, openModal, closeModal } = useModal();

  const ingridientModal = (
    <Modal
      onClose={closeModal}
      header={<h3 className="text text_type_main-large">Детали ингредиента</h3>}
    >
      <IngredientDetails {...props} />
    </Modal>
  );

  return (
    <>
      <section className={styles.item} onClick={openModal}>
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
      {isModalOpen && ingridientModal}
    </>
  );
};

export default BurgerIngredient;
