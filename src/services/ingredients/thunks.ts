import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_DOMAIN } from "../../constants";
import { IngredientData, CommonResult } from "../../types";

export const fetchIngredients = createAsyncThunk<
  IngredientData[],
  undefined,
  {
    fulfillWithValue: IngredientData[];
    rejectValue: CommonResult;
  }
>("ingredients/fetch", async (_, { fulfillWithValue, rejectWithValue }) => {
  try {
    const responseRaw = await fetch(`${API_DOMAIN}/ingredients`);
    if (responseRaw.ok) {
      const payload = await responseRaw.json();

      if (payload.success) {
        return fulfillWithValue(payload.data);
      }
    }

    return rejectWithValue({
      success: false,
      reason: `Ошибка ${responseRaw.status}`,
    });
  } catch (err) {
    return rejectWithValue({ success: false, reason: "Техническая ошибка" });
  }
});
