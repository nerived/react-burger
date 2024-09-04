import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { burgerConstructorState } from "./types";

export const burgerConstructorInitialState: burgerConstructorState = {
  bunId: "",
  ingredientIds: [],
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState: burgerConstructorInitialState,
  reducers: {
    updateBunId: (state, action: PayloadAction<string>) => {
      state.bunId = action.payload;
    },
    ingredientAdded(state, action: PayloadAction<string>) {
      state.ingredientIds.push(action.payload);
    },
    updateSorting(state, action: PayloadAction<string[]>) {
      state.ingredientIds = action.payload;
    },
    ingredientDeleted(state, action: PayloadAction<string>) {
      const newIngredientIds = state.ingredientIds.filter(
        (ingredient) => ingredient !== action.payload
      );
      state.ingredientIds = newIngredientIds;
    },
    resetConstructor: () => {
      return burgerConstructorInitialState;
    },
  },
});

export const {
  updateBunId,
  ingredientAdded,
  ingredientDeleted,
  resetConstructor,
  updateSorting,
} = burgerConstructorSlice.actions;

export const burgerConstructorReducer = burgerConstructorSlice.reducer;
