import cn from "classnames";
import { useSelector } from "react-redux";

import { ingredientDetailsSelectors } from "../../services";
import { Modal } from "../Modal";

import styles from "./IngredientDetails.module.css";

export type IngredientDetailsProps = {
  handleCloseModal: () => void;
};

export const IngredientDetails = ({
  handleCloseModal,
}: IngredientDetailsProps) => {
  const ingredientDetails = useSelector(
    ingredientDetailsSelectors.getIngredientDetails
  );
  const { name, image_large, calories, proteins, fat, carbohydrates } =
    ingredientDetails;

  return (
    <Modal
      onClose={handleCloseModal}
      header={<h3 className="text text_type_main-large">Детали ингредиента</h3>}
    >
      <div className={cn(styles.contetn, "pb-5")}>
        <img src={image_large} alt={name} className={cn(styles.img, "mb-4")} />
        <p className="text text_type_main-medium mb-8">{name}</p>
        <ul className={styles.list}>
          <li className={styles.item}>
            <div className="text text_type_main-default text_color_inactive">
              Калории,ккал
            </div>
            <div className="text text_type_main-default text_color_inactive">
              {calories}
            </div>
          </li>
          <li className={styles.item}>
            <div className="text text_type_main-default text_color_inactive">
              Белки, г
            </div>
            <div className="text text_type_main-default text_color_inactive">
              {proteins}
            </div>
          </li>
          <li className={styles.item}>
            <div className="text text_type_main-default text_color_inactive">
              Жиры, г
            </div>
            <div className="text text_type_main-default text_color_inactive">
              {fat}
            </div>
          </li>
          <li className={styles.item}>
            <div className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </div>
            <div className="text text_type_main-default text_color_inactive">
              {carbohydrates}
            </div>
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default IngredientDetails;
