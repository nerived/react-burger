import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import cn from "classnames";

import { ConstructorItem } from "../ConstructorItem";
import styles from "./BurgerConstructor.module.css";

export const BurgerConstructor = () => {
  const selectedIngridients = [
    "60666c42cc7b410027a1a9b9",
    "60666c42cc7b410027a1a9b4",
    "60666c42cc7b410027a1a9bc",
    "60666c42cc7b410027a1a9bb",
    "60666c42cc7b410027a1a9bd",
  ];
  return (
    <>
      <div className="pb-10" />
      <section className={cn(styles.start, "pl-4 pr-4  pb-4 pt-25")}>
        <ConstructorItem
          type="top"
          id="60666c42cc7b410027a1a9b1"
          prefix=" (верх)"
        />
      </section>
      <ul className={cn(styles.list, "pl-4 pr-4 ")}>
        {selectedIngridients.map((ingridientId) => {
          return (
            <li key={ingridientId} className={cn(styles.item, "pb-4")}>
              <ConstructorItem id={ingridientId} />
            </li>
          );
        })}
      </ul>
      <section className={cn(styles.start, "pb-4 pt-4 pl-4 pr-4 ")}>
        <ConstructorItem
          type="bottom"
          id="60666c42cc7b410027a1a9b1"
          prefix=" (низ)"
        />
      </section>
      <div className={cn(styles.total, "pt-6 pl-4 pr-4")}>
        <span className={cn("text text_type_digits-medium")}>610</span>
        <CurrencyIcon type="primary" /> <div className="pr-10"></div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </>
  );
};

export default BurgerConstructor;
