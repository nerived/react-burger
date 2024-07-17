import { createAsyncThunk } from "@reduxjs/toolkit";

import { userApi } from "../../services/api";
import { UpdateUserPayload } from "../../services/api/user/types";

import { UserState } from "./types";

export const fetchUser = createAsyncThunk<
  UserState,
  undefined,
  {
    fulfillWithValue: UserState;
    rejectValue: UserState;
  }
>("user/fetch", async (_, { fulfillWithValue, rejectWithValue }) => {
  let value = await userApi.fetchUser();

  if (value.success) {
    return fulfillWithValue(value.user);
  }

  return rejectWithValue({ name: "", email: "" });
});

export const updateUser = createAsyncThunk<
  UserState,
  UpdateUserPayload,
  {
    fulfillWithValue: UserState;
    rejectValue: UserState;
  }
>("user/update", async (data, { fulfillWithValue, rejectWithValue }) => {
  let value = await userApi.updateUser(data);

  if (value.success) {
    return fulfillWithValue(value.user);
  }

  return rejectWithValue({ name: "", email: "" });
});
