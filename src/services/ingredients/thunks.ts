import { createAsyncThunk } from "@reduxjs/toolkit";

import { API_DOMAIN } from "../../constants";
import { IngredientData, CommonError } from "../../types";
import { request } from "../../api";

type IngredientsValue = {
  success: true;
  data: IngredientData[];
};

export const fetchIngredients = createAsyncThunk<
  IngredientData[],
  undefined,
  {
    fulfillWithValue: IngredientData[];
    rejectValue: CommonError;
  }
>("ingredients/fetch", async (_, { fulfillWithValue, rejectWithValue }) => {
  const value = await request<IngredientsValue>(`${API_DOMAIN}/ingredients`);

  if (value.success) {
    return fulfillWithValue(value.data);
  }

  return rejectWithValue(value);
});
