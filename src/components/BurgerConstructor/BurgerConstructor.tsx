import { useCallback } from "react";

import { nanoid } from "@reduxjs/toolkit";

import {
  burgerConstructorSelectors,
  updateBunId,
  ingredientAdded,
  updateIngredientCount,
} from "../../services";
import { IngredientType, DNDIngredientItem } from "../../types";
import { useAppDispatch, useAppSelector } from "../../store";
import { ID_SPLITER } from "../../constants";

import { Order } from "../Order";
import { BurgerConstructorBun } from "../BurgerConstructorBun";
import { BurgerConstructorMiddle } from "../BurgerConstructorMiddle";

export const BurgerConstructor = () => {
  const bunId = useAppSelector(burgerConstructorSelectors.getBunId);
  const dispatch = useAppDispatch();

  const handleDrop = useCallback(
    (itemId: DNDIngredientItem) => {
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
