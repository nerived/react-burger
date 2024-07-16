import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { shallowEqual } from "react-redux";
import cn from "classnames";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { ID_SPLITER } from "../../constants";
import {
  orderDetailsThunks,
  resetOrderDetails,
  ingredientsSelectors,
  burgerConstructorSelectors,
  resetConstructor,
  resetIngredientsCount,
  userSelectors,
} from "../../services";
import { useModal } from "../../hooks";
import { useAppDispatch, useAppSelector } from "../../store";

import { Loader } from "../Loader";
import { OrderDetails } from "../OrderDetails";

import styles from "./Order.module.css";

export const Order = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(userSelectors.getUserIsLoggedIn);
  const navigate = useNavigate();
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  const ingredients = useAppSelector(ingredientsSelectors.getIngredients);

  const ids = useAppSelector((state) => {
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

  const handleOrderClick = useCallback(async () => {
    if (isLoggedIn) {
      setIsOrderLoading(true);
      await dispatch(orderDetailsThunks.sendOrderData({ ingredients: ids }));
      dispatch(resetIngredientsCount());
      dispatch(resetConstructor());
      openModal();
      setIsOrderLoading(false);
    } else {
      navigate("/login");
    }
  }, [openModal, dispatch, ids, navigate, isLoggedIn]);

  return (
    <div className={cn(styles.total, "pt-6 pl-4 pr-4")}>
      <span className={cn("text text_type_digits-medium")}>{totalPrice}</span>
      <CurrencyIcon type="primary" /> <div className="pr-10"></div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        disabled={!ids[0]}
        onClick={handleOrderClick}
      >
        Оформить заказ
      </Button>
      {isOrderLoading && <Loader />}
      {isModalOpen && <OrderDetails handleCloseModal={handleCloseModal} />}
    </div>
  );
};

export default Order;
