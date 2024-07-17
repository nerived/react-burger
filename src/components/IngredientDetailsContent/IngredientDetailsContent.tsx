import cn from "classnames";
import { useParams } from "react-router-dom";

import { ingredientsSelectors } from "../../services";
import { useAppSelector } from "../../store";

import styles from "./IngredientDetailsContent.module.css";

export const IngredientDetailsContent = () => {
  const { id } = useParams<{ id: string }>();

  const ingredientDetails = useAppSelector((state) => {
    return ingredientsSelectors.getIngredientById(state, id as string);
  });

  if (!ingredientDetails) {
    return null;
  }

  const { name, image_large, calories, proteins, fat, carbohydrates } =
    ingredientDetails;

  return (
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
  );
};

export default IngredientDetailsContent;
