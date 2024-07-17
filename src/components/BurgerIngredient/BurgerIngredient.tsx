import { useDrag } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import cn from "classnames";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Ingredient, DNDIngredientItem } from "../../types";

import styles from "./BurgerIngredient.module.css";

export const BurgerIngredient = (props: Ingredient) => {
  const { price, name, image, count = 0, _id, type } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenModal = () => {
    navigate(`/ingredients/${props._id}`, {
      state: { background: location },
    });
  };

  const [{ opacity }, drag] = useDrag<
    DNDIngredientItem,
    unknown,
    { opacity: number }
  >({
    type: "ingredient",
    item: { id: _id, type, count },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <>
      <section
        className={styles.item}
        onClick={handleOpenModal}
        draggable
        ref={drag}
        style={{ opacity }}
      >
        {!!count && <Counter count={count} size="default" />}
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
    </>
  );
};

export default BurgerIngredient;
