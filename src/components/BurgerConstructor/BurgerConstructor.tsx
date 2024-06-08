import { useCallback } from "react";

import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import {
  burgerConstructorSelectors,
  updateBunId,
  ingredientAdded,
  updateIngredientCount,
} from "../../services";
import { IngredientType } from "../../types";
import { useAppDispatch } from "../../store";
import { ID_SPLITER } from "../../constants";

import { Order } from "../Order";
import { BurgerConstructorBun } from "../BurgerConstructorBun";
import { BurgerConstructorMiddle } from "../BurgerConstructorMiddle";

export const BurgerConstructor = () => {
  const bunId = useSelector(burgerConstructorSelectors.getBunId);
  const dispatch = useAppDispatch();

  const handleDrop = useCallback(
    (itemId: any) => {
      const modifyId = itemId.id + ID_SPLITER + nanoid(9);
      const bunIngridientId = bunId.split(ID_SPLITER)[0];

      if (itemId.type === IngredientType.BUNN) {
        dispatch(updateBunId(modifyId));

        dispatch(updateIngredientCount({ id: bunIngridientId, count: 0 }));
        dispatch(updateIngredientCount({ id: itemId.id, count: 2 }));
      } else {
        dispatch(ingredientAdded(modifyId));
        dispatch(
          updateIngredientCount({ id: itemId.id, count: itemId.count + 1 })
        );
      }
    },
    [dispatch, bunId]
  );

  return (
    <>
      <div className="pb-20" />
      <div className="pb-1" />
      <BurgerConstructorBun
        bunId={bunId}
        type={"top"}
        prefix=" (верх)"
        handleDrop={handleDrop}
      />
      <BurgerConstructorMiddle handleDrop={handleDrop} />
      <BurgerConstructorBun
        bunId={bunId}
        type={"bottom"}
        prefix=" (низ)"
        handleDrop={handleDrop}
      />
      <Order />
    </>
  );
};

export default BurgerConstructor;
