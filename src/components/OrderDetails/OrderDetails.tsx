import cn from "classnames";
import { useSelector } from "react-redux";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ReactComponent as OrderGradient } from "../../images/order-gradient.svg";
import { orderDetailsSelectors } from "../../services";

import { Modal } from "../Modal";

import styles from "./OrderDetails.module.css";

export type OrderDetailsProps = {
  handleCloseModal: () => void;
};

export const OrderDetails = ({ handleCloseModal }: OrderDetailsProps) => {
  const { name = "идентификатор заказа", number } = useSelector(
    orderDetailsSelectors.getOrderDetails
  );

  return (
    <Modal
      onClose={handleCloseModal}
      header={<h3 className="text text_type_main-large">Детали ингредиента</h3>}
    >
      <div className={styles.contetn}>
        <p className="text text_type_digits-large pb-8">{number}</p>
        <p className="text text_type_main-medium pb-15">{name}</p>
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
    </Modal>
  );
};

export default OrderDetails;
