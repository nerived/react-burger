import { RootState } from "../../store";

export const getIngredients = (state: RootState) => {
  return state.ingredients;
};

export const getIngredientById = (state: RootState, id: string) => {
  return getIngredients(state).find((ingredient) => ingredient._id === id);
};
