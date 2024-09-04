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
      <p
        className="text text_type_main-medium mb-8"
        data-testid="ingredient-name"
      >
        {name}
      </p>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </div>
          <div
            className="text text_type_main-default text_color_inactive"
            data-testid="ingredient-calories"
          >
            {calories}
          </div>
        </li>
        <li className={styles.item}>
          <div className="text text_type_main-default text_color_inactive">
            Белки, г
          </div>
          <div
            className="text text_type_main-default text_color_inactive"
            data-testid="ingredient-proteins"
          >
            {proteins}
          </div>
        </li>
        <li className={styles.item}>
          <div className="text text_type_main-default text_color_inactive">
            Жиры, г
          </div>
          <div
            className="text text_type_main-default text_color_inactive"
            data-testid="ingredient-fat"
          >
            {fat}
          </div>
        </li>
        <li className={styles.item}>
          <div className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </div>
          <div
            className="text text_type_main-default text_color_inactive"
            data-testid="ingredient-carbohydrates"
          >
            {carbohydrates}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetailsContent;
