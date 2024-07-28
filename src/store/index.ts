import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

import {
  ingredientsReducer,
  burgerConstructorReducer,
  orderDetailsReducer,
  userReducer,
} from "../services";

import { feedReducer, feedSlice } from "../services/feeds";
import { historyReducer, historySlice } from "../services/history";

import { WS_FEED_URL, WS_HISTORY_URL } from "../constants";

import { socketMidlleware } from "../middleware";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    orderDetails: orderDetailsReducer,
    user: userReducer,
    feeds: feedReducer,
    history: historyReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMidlleware(WS_FEED_URL, feedSlice.actions),
      socketMidlleware(WS_HISTORY_URL, historySlice.actions)
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
