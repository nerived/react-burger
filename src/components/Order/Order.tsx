import { useCallback, useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import cn from "classnames";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  orderDetailsThunks,
  resetOrderDetails,
  ingredientsSelectors,
  burgerConstructorSelectors,
  resetConstructor,
  resetIngredientsCount,
} from "../../services";
import { useModal } from "../../hooks";
import { useAppDispatch, RootState } from "../../store";
import { ID_SPLITER } from "../../constants";

import { OrderDetails } from "../OrderDetails";

import styles from "./Order.module.css";

export const Order = () => {
  const dispatch = useAppDispatch();

  const ingredients = useSelector(ingredientsSelectors.getIngredients);

  const ids = useSelector((state: RootState) => {
    const constructorIngredientIds =
      burgerConstructorSelectors.getConstructorIngredientIds(state);
    const bunId = burgerConstructorSelectors.getBunId(state);

    const ids = [bunId, ...constructorIngredientIds, bunId].map(
      (ingredientId) => {
        const id = ingredientId.split(ID_SPLITER)[0];
        return id;
      },
      0
    );

    return ids;
  }, shallowEqual);

  const { isModalOpen, openModal, closeModal } = useModal();

  const totalPrice = useMemo(() => {
    return ingredients.reduce((acc, ingredient) => {
      if (ingredient.count) {
        acc += ingredient.count * ingredient.price;
      }
      return acc;
    }, 0);
  }, [ingredients]);

  const handleCloseModal = useCallback(() => {
    closeModal();
    dispatch(resetOrderDetails());
  }, [closeModal, dispatch]);

  const handleOpenModal = useCallback(async () => {
    await dispatch(orderDetailsThunks.sendOrderData({ ingredients: ids }));
    dispatch(resetIngredientsCount());
    dispatch(resetConstructor());
    openModal();
  }, [openModal, dispatch, ids]);

  return (
    <div className={cn(styles.total, "pt-6 pl-4 pr-4")}>
      <span className={cn("text text_type_digits-medium")}>{totalPrice}</span>
      <CurrencyIcon type="primary" /> <div className="pr-10"></div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={handleOpenModal}
      >
        Оформить заказ
      </Button>
      {isModalOpen && <OrderDetails handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default Order;
