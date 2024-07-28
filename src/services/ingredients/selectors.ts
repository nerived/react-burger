import { RootState } from "../../store";

export const getIngredients = (state: RootState) => {
  return state.ingredients;
};

export const getIngredientById = (state: RootState, id: string) => {
  return getIngredients(state).find((ingredient) => ingredient._id === id);
};

export const getIngredientsForFeed = (state: RootState, ids: string[]) => {
  return ids.reduce(
    (acc, id) => {
      const ingredient = getIngredientById(state, id);
      if (ingredient) {
        acc.items.push(ingredient.image);
        acc.total += ingredient.price;
      }

      return acc;
    },
    { items: [] as string[], total: 0 }
  );
};

export const getTotalForShortFeed = (state: RootState, ids: string[]) => {
  let uniqueIngredient = [] as string[];
  let total = 0;
  let ingredientsCount: Record<string, number> = {};

  for (let id of ids) {
    const ingredient = getIngredientById(state, id);

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
