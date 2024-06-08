import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import {
  ingredientsReducer,
  burgerConstructorReducer,
  ingredientDetailsReducer,
  orderDetailsReducer,
} from "../services";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    orderDetails: orderDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
