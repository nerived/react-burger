import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Ingredient } from "../../types";

const initialState: Ingredient = {} as Ingredient;

export const ingredientDetailsSlice = createSlice({
  name: "ingredientDetails",
  initialState,
  reducers: {
    addIngredientDetails: (state, action: PayloadAction<Ingredient>) => {
      Object.assign(state, action.payload);
    },

    resetIngredientDetails: (state) => {
      return initialState;
    },
  },
});

export const { addIngredientDetails, resetIngredientDetails } =
  ingredientDetailsSlice.actions;

export const ingredientDetailsReducer = ingredientDetailsSlice.reducer;
