import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientData } from "../../utils";

export type ConstructorItemProps = {
  type?: "bottom" | "top";
  id: string;
  prefix?: string;
  getIngridientById: (id: string) => IngredientData | undefined;
};

export const ConstructorItem = ({
  type,
  id,
  prefix,
  getIngridientById,
}: ConstructorItemProps) => {
  const ingridient = getIngridientById(id);

  if (!ingridient) {
    return null;
  }

  const { price, name, image } = ingridient;

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
      />
    </>
  );
};

export default ConstructorItem;
