import { createSlice } from "@reduxjs/toolkit";

import { sendOrderData } from "./thunks";
import { OrderDetailsState } from "./types";

const initialState: OrderDetailsState = {
  name: "",
  number: 0,
};

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOrderData.fulfilled, (state, action) => {
        return action.payload;
      })

      .addCase(sendOrderData.rejected, (state) => {
        return initialState;
      });
  },
});

export const { resetOrderDetails } = orderDetailsSlice.actions;

export const orderDetailsReducer = orderDetailsSlice.reducer;
