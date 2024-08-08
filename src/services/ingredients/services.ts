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

export const getIngredientsForFeed = (
  ingredients: Ingredient[],
  ids: string[]
) => {
  return ids.reduce(
    (acc, id) => {
      const ingredient = ingredients.find(
        (ingredient) => ingredient._id === id
      );
      if (ingredient) {
        acc.items.push(ingredient.image);
        acc.total += ingredient.price;
      }

      return acc;
    },
    { items: [] as string[], total: 0 }
  );
};

export const getTotalForShortFeed = (
  ingredients: Ingredient[],
  ids: string[]
) => {
  let uniqueIngredient = [] as string[];
  let total = 0;
  let ingredientsCount: Record<string, number> = {};

  for (let id of ids) {
    const ingredient = ingredients.find((ingredient) => ingredient._id === id);

    if (ingredient) {
      if (!uniqueIngredient.includes(id)) {
        uniqueIngredient.push(id);
        ingredientsCount[id] = 1;
      } else {
        ingredientsCount[id] += 1;
      }

      total += ingredient.price;
    }
  }

  return {
    uniqueIngredient,
    total,
    ingredientsCount,
  };
};
