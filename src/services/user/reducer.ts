import { createSlice } from "@reduxjs/toolkit";

import { fetchUser, updateUser } from "./thunks";
import { UserState } from "./types";

export const userInitialState: UserState = {
  email: "",
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    resetUser: (state) => {
      return userInitialState;
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
        return userInitialState;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { resetUser, setUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
