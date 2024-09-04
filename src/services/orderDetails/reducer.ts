import { createSlice } from "@reduxjs/toolkit";

import { sendOrderData } from "./thunks";
import { OrderDetailsState } from "./types";

export const orderDetailsInitialState: OrderDetailsState = {
  name: "",
  number: 0,
};

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: orderDetailsInitialState,
  reducers: {
    resetOrderDetails: (state) => {
      return orderDetailsInitialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderData.fulfilled, (state, action) => {
        return action.payload;
      })

      .addCase(sendOrderData.rejected, (state) => {
        return orderDetailsInitialState;
      });
  },
});

export const { resetOrderDetails } = orderDetailsSlice.actions;

export const orderDetailsReducer = orderDetailsSlice.reducer;
