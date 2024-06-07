import { useState } from "react";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";

import { IngredientData } from "../../utils";

import { Modal } from "../Modal";
import { OrderDetails } from "../OrderDetails";
import { ConstructorItem } from "../ConstructorItem";

import styles from "./BurgerConstructor.module.css";

export type BurgerConstructorProps = {
  getIngridientById: (id: string) => IngredientData | undefined;
};

const selectedIngridients = [
  "643d69a5c3f7b9001cfa0941",
  "643d69a5c3f7b9001cfa093e",
  "643d69a5c3f7b9001cfa0942",
  "643d69a5c3f7b9001cfa0943",
  "643d69a5c3f7b9001cfa0940",
  "643d69a5c3f7b9001cfa093d",
];

export const BurgerConstructor = ({
  getIngridientById,
}: BurgerConstructorProps) => {
  const [isShowOrderModal, setIsShowOrderModal] = useState(false);

  const handleOpenModal = () => {
    setIsShowOrderModal(true);
  };

  const handleCloseModal = () => {
    setIsShowOrderModal(false);
  };

  const orderModal = (
    <Modal onClose={handleCloseModal}>
      <OrderDetails id="034536" />
    </Modal>
  );

  return (
    <>
      <div className="pb-10" />
      <section className={cn(styles.start, "pl-4 pr-4  pb-4 pt-25")}>
        <ConstructorItem
          type="top"
          getIngridientById={getIngridientById}
          id="643d69a5c3f7b9001cfa093c"
          prefix=" (верх)"
        />
      </section>
      <ul className={cn(styles.list, "pl-4 pr-4 ")}>
        {selectedIngridients.map((ingridientId) => {
          return (
            <li key={ingridientId} className={cn(styles.item, "pb-4")}>
              <ConstructorItem
                id={ingridientId}
                getIngridientById={getIngridientById}
              />
            </li>
          );
        })}
      </ul>
      <section className={cn(styles.start, "pb-4 pt-4 pl-4 pr-4 ")}>
        <ConstructorItem
          type="bottom"
          getIngridientById={getIngridientById}
          id="643d69a5c3f7b9001cfa093c"
          prefix=" (низ)"
        />
      </section>
      <div className={cn(styles.total, "pt-6 pl-4 pr-4")}>
        <span className={cn("text text_type_digits-medium")}>610</span>
        <CurrencyIcon type="primary" /> <div className="pr-10"></div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handleOpenModal}
        >
          Оформить заказ
        </Button>
        {isShowOrderModal && orderModal}
      </div>
    </>
  );
};

export default BurgerConstructor;
