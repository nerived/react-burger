import { IngredientType, IngredientData } from "./types";
import { ingredientsData } from "./data";

export const getIngridientById = (id?: string) => {
  return ingredientsData.find((item) => item._id === id);
};

export const grouptIngridients = () => {
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
