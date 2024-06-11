import { RootState } from "../../store";

export const getConstructor = (state: RootState) => {
  return state.burgerConstructor;
};

export const getBunId = (state: RootState) => {
  return getConstructor(state).bunId;
};

export const getConstructorIngredientIds = (state: RootState) => {
  return getConstructor(state).ingredientIds;
};
