import cn from "classnames";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ReactComponent as OrderGradient } from "../../images/order-gradient.svg";

import styles from "./OrderDetails.module.css";

export type OrderDetailsProps = {
  id: string;
};

export const OrderDetails = ({ id }: OrderDetailsProps) => {
  return (
    <div className={styles.contetn}>
      <p className="text text_type_digits-large pb-8">{id}</p>
      <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
      <div className={cn(styles.icon, "mb-15")}>
        <OrderGradient />
        <div className={styles.mark}>
          <CheckMarkIcon type="primary" />
        </div>
      </div>
      <p className="text text_type_main-default pb2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive pb-20">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
