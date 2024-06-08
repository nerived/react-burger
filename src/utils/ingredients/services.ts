import { IngredientType, IngredientData } from "./types";

export const findIngridientById = (
  ingredientsData: IngredientData[],
  id: string
) => {
  return ingredientsData.find((item) => item._id === id);
};

export const grouptIngridients = (ingredientsData: IngredientData[]) => {
  return ingredientsData.reduce<Record<IngredientType, IngredientData[]>>(
    (acc, ingredientData) => {
      if (acc[ingredientData.type]) {
        acc[ingredientData.type].push(ingredientData);
      } else {
        acc[ingredientData.type] = [ingredientData];
      }

      return acc;
    },
    {} as Record<IngredientType, IngredientData[]>
  );
};
