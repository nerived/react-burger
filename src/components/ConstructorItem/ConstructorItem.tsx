import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { getIngridientById } from "../../utils";

export type ConstructorItemProps = {
  type?: "bottom" | "top";
  id: string;
  prefix?: string;
};

export const ConstructorItem = ({ type, id, prefix }: ConstructorItemProps) => {
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
