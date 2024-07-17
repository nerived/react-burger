import { createSlice } from "@reduxjs/toolkit";

import { fetchUser, updateUser } from "./thunks";
import { UserState } from "./types";

const initialState: UserState = {
  email: "",
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      return initialState;
    },
    setUser: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        return action.payload;
      })

      .addCase(fetchUser.rejected, (state) => {
        return initialState;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { resetUser, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
