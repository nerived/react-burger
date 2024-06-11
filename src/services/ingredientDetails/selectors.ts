import { RootState } from "../../store";

export const getIngredientDetails = (state: RootState) => {
  return state.ingredientDetails;
};
