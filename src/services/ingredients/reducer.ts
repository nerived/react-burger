import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Ingredient } from "../../types";

import { fetchIngredients } from "./thunks";

export const ingredientsInitialState: Ingredient[] = [];

export const ingredientSlice = createSlice({
  name: "ingredients",
  initialState: ingredientsInitialState,
  reducers: {
    updateIngredientCount: (
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) => {
      const ingredient = state.find(
        (ingredient) => ingredient._id === action.payload.id
      );
      if (ingredient) {
        ingredient["count"] = action.payload.count;
      }
    },
    resetIngredientsCount: (state) => {
      state.map((item) => {
        item.count = 0;
        return item;
      });
    },

    resetIngredients: (state) => {
      return ingredientsInitialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        return action.payload;
      })

      .addCase(fetchIngredients.rejected, (state) => {
        return ingredientsInitialState;
      });
  },
});

export const {
  updateIngredientCount,
  resetIngredients,
  resetIngredientsCount,
} = ingredientSlice.actions;

export const ingredientsReducer = ingredientSlice.reducer;
