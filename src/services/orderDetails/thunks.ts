import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_DOMAIN } from "../../constants";
import { CommonError } from "../../types";
import { request } from "../../api";

import { OrderDetailsState } from "./types";

type OrderDetailsValue = {
  success: true;
  name: string;
  order: {
    number: number;
  };
};

export const sendOrderData = createAsyncThunk<
  OrderDetailsState,
  { ingredients: string[] },
  {
    fulfillWithValue: OrderDetailsState;
    rejectValue: CommonError;
  }
>("orderDetails/order", async (data, { fulfillWithValue, rejectWithValue }) => {
  const value = await request<OrderDetailsValue>(`${API_DOMAIN}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  if (value.success) {
    return fulfillWithValue({
      name: value.name,
      number: value.order.number,
    });
  }

  return rejectWithValue(value);
});
