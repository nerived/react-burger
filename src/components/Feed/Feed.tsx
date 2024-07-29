import { useMemo } from "react";
import cn from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppSelector } from "../../store";
import { STATUS_MAP } from "../../constants";
import { OrderStatus, TOrder } from "../../types";
import {
  ingredientsSelectors,
  ingredientsServices,
} from "../../services/ingredients";

import { FeedImage } from "../FeedImage";

import styles from "./Feed.module.css";

type FeedProps = TOrder & { route: string };

export const Feed = (props: FeedProps) => {
  const { number, createdAt, ingredients, name, route, status } = props;

  const isHistory = route === "/profile/orders";

  const ingredientsData = useAppSelector(ingredientsSelectors.getIngredients);

  const { items, total } = useMemo(() => {
    return ingredientsServices.getIngredientsForFeed(
      ingredientsData,
      ingredients
    );
  }, [ingredientsData, ingredients]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenModal = () => {
    navigate(`${route}/${number}`, {
      state: { background: location },
    });
  };

  return (
    <div className={cn(styles.feed, "p-6")} onClick={handleOpenModal}>
      <div className={cn(styles.head, "mb-6")}>
        <div className="text text_type_digits-default">#{number}</div>
        <div
          className={cn(
            styles.time,
            "text text_type_main-default text_color_inactive"
          )}
        >
          <FormattedDate date={new Date(createdAt)} />
        </div>
      </div>
      <div className="mb-6">
        <h3 className={"text text_type_main-medium"}>{name}</h3>
        {isHistory && (
          <div
            className={cn(
              "text text_type_main-default mt-2",
              status === OrderStatus.DONE && styles.completed
            )}
          >
            {STATUS_MAP[status]}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.items}>
          {items.map((ingredient, index) => {
            return (
              <FeedImage key={`${ingredient}-${index}`} src={ingredient} />
            );
          })}
        </div>
        <div className={cn(styles.price, "pl-2 text text_type_digits-default")}>
          <span className={"pr-2"}>{total}</span>{" "}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default Feed;
