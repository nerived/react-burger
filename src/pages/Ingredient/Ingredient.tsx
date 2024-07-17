import { PageLayout } from "../../components/PageLayout";
import { IngredientDetailsContent } from "../../components/IngredientDetailsContent";

import styles from "./Ingredient.module.css";

export const Ingredient = () => {
  return (
    <PageLayout>
      <div className={styles.container}>
        <h2 className="text text_type_main-medium pb-6">Детали ингредиента</h2>
        <IngredientDetailsContent />
      </div>
    </PageLayout>
  );
};

export default Ingredient;
