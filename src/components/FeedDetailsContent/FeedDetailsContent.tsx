import { useMemo } from "react";
import cn from "classnames";
import { useParams, useLocation } from "react-router-dom";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppSelector } from "../../store";
import { STATUS_MAP } from "../../constants";
import { OrderStatus } from "../../types";
import {
  feedsSelectors,
  ingredientsSelectors,
  ingredientsServices,
} from "../../services";
import { historySelectors } from "../../services/history";

import { FeedShort } from "../FeedShort";

import styles from "./FeedDetailsContent.module.css";

type FeedDetailsContentProps = {
  isModal?: boolean;
};

export const FeedDetailsContent = ({
  isModal = false,
}: FeedDetailsContentProps) => {
  const { id = "" } = useParams<{ id: string }>();
  const pageLoaction = useLocation();

  const isHistory = pageLoaction.pathname.includes("/profile/orders");

  const details = useAppSelector((state) => {
    return isHistory
      ? historySelectors.getHistoryByNumber(state, id)
      : feedsSelectors.getFeedByNumber(state, id);
  });

  const ingredients = useAppSelector(ingredientsSelectors.getIngredients);

  const preparedData = useMemo(() => {
    return ingredientsServices.getTotalForShortFeed(
      ingredients,
      details?.ingredients || []
    );
  }, [ingredients, details]);

  if (!details) {
    return null;
  }

  return (
    <div className={cn(styles.contetn, "pb-5")}>
      {!isModal && (
        <div
          className={cn(styles.number, "text text_type_digits-default mb-10")}
        >
          #{details.number}
        </div>
      )}
      <div className="mb-15">
        <h3 className={"text text_type_main-medium"}>{details.name}</h3>
        <div
          className={cn(
            "text text_type_main-default mt-3",
            details.status === OrderStatus.DONE && styles.completed
          )}
        >
          {STATUS_MAP[details.status]}
        </div>
      </div>
      <div className={"text text_type_main-medium mb-6"}>Состав:</div>

      <ul className={styles.list}>
        {preparedData.uniqueIngredient.map((ingredient) => {
          return (
            <li className={styles.item} key={ingredient}>
              <FeedShort
                _id={ingredient}
                count={preparedData.ingredientsCount[ingredient]}
              />{" "}
            </li>
          );
        })}
      </ul>
      <div className={cn(styles.footer, "mt-10")}>
        <div className={"text text_type_main-default text_color_inactive"}>
          <FormattedDate date={new Date(details.createdAt)} />
        </div>
        <div className={cn(styles.price, "pl-4 text text_type_digits-default")}>
          <span className={"pr-2"}>{preparedData.total}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedDetailsContent;
