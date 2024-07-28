import cn from "classnames";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useAppSelector } from "../../store";
import { ingredientsSelectors } from "../../services/ingredients";

import { FeedImage } from "../FeedImage";

import styles from "./FeedShort.module.css";

type FeedProps = {
  _id: string;
  count: number;
};

export const FeedShort = (props: FeedProps) => {
  const { count, _id } = props;

  const data = useAppSelector((state) => {
    return ingredientsSelectors.getIngredientById(state, _id);
  });

  if (!data) {
    return null;
  }

  return (
    <>
      <div className="text text_type_main-default text_color_inactive mr-4">
        <FeedImage src={data.image} />
      </div>
      <div className="text text_type_main-default">{data.name}</div>
      <div className={cn(styles.price, "pl-4 text text_type_digits-default")}>
        <span className={"pr-2"}>
          {count} x {data.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
    </>
  );
};

export default FeedShort;
