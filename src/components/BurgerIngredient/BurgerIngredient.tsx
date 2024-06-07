import cn from "classnames";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { getIngridientById } from "../../utils";

import styles from "./BurgerIngredient.module.css";

export const BurgerIngredient = ({ id }: { id: string }) => {
  const ingredient = getIngridientById(id);

  if (!ingredient) {
    return null;
  }

  const { price, name, proteins, image } = ingredient;

  return (
    <section className={styles.item}>
      <Counter count={proteins} size="default" />
      <div className={cn(styles.img, "pl-4 pr-4")}>
        <img src={image} alt={name} />
      </div>
      <div
        className={cn(styles.price, "pt-1 pb-1 text text_type_digits-default")}
      >
        {price} <CurrencyIcon type="primary" />
      </div>
      <div className={cn(styles.title, "text text_type_main-default")}>
        {name}
      </div>
    </section>
  );
};

export default BurgerIngredient;
