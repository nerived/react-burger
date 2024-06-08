import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_DOMAIN } from "../../constants";
import { CommonResult } from "../../types";

import { OrderDetailsState } from "./types";

export const sendOrderData = createAsyncThunk<
  OrderDetailsState,
  { ingredients: string[] },
  {
    fulfillWithValue: OrderDetailsState;
    rejectValue: CommonResult;
  }
>(
  "orderDetails/order",
  async (data, { fulfillWithValue, rejectWithValue, getState }) => {
    try {
      const responseRaw = await fetch(`${API_DOMAIN}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
      });
      if (responseRaw.ok) {
        const payload = await responseRaw.json();

        if (payload.success) {
          return fulfillWithValue({
            name: payload.name,
            number: payload.order.number,
          });
        }
      }

      return rejectWithValue({
        success: false,
        reason: `Ошибка ${responseRaw.status}`,
      });
    } catch (err) {
      return rejectWithValue({ success: false, reason: "Техническая ошибка" });
    }
  }
);
