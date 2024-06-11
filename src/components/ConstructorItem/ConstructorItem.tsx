import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { RootState, useAppDispatch } from "../../store";
import {
  ingredientsSelectors,
  ingredientDeleted,
  updateIngredientCount,
} from "../../services";
import { ID_SPLITER } from "../../constants";

export type ConstructorItemProps = {
  type?: "bottom" | "top";
  modifyId: string;
  prefix?: string;
  extraClass?: string;
};

export const ConstructorItem = ({
  type,
  modifyId,
  prefix,
  extraClass,
}: ConstructorItemProps) => {
  const originId = useMemo(() => {
    return modifyId.split(ID_SPLITER)[0];
  }, [modifyId]);

  const ingredient = useSelector((state: RootState) => {
    return ingredientsSelectors.getIngredientById(state, originId);
  });

  const count = ingredient?.count || 0;

  const dispatch = useAppDispatch();

  const onDelete = useCallback(() => {
    dispatch(updateIngredientCount({ id: originId, count: count - 1 }));

    dispatch(ingredientDeleted(modifyId));
  }, [dispatch, modifyId, originId, count]);

  if (!ingredient) {
    return null;
  }

  const { price, name, image } = ingredient;

  return (
    <>
      {type ? (
        <div className="pr-8"></div>
      ) : (
        <div className="pr-2">
          <DragIcon type="primary" />
        </div>
      )}

      <ConstructorElement
        type={type}
        isLocked={!!type}
        text={`${name}${prefix ? prefix : ""}`}
        price={price}
        thumbnail={image}
        handleClose={onDelete}
        extraClass={extraClass}
      />
    </>
  );
};

export default ConstructorItem;
