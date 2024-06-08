import { IngredientType, Ingredient } from "../../types";

export const findIngredientById = (
  ingredientsData: Ingredient[],
  id: string
) => {
  return ingredientsData.find((item) => item._id === id);
};

export const grouptIngredients = (ingredientsData: Ingredient[]) => {
  return ingredientsData.reduce<Record<IngredientType, Ingredient[]>>(
    (acc, ingredientData) => {
      if (acc[ingredientData.type]) {
        acc[ingredientData.type].push(ingredientData);
      } else {
        acc[ingredientData.type] = [ingredientData];
      }

      return acc;
    },
    {} as Record<IngredientType, Ingredient[]>
  );
};
