import { createSlice } from "@reduxjs/toolkit";

import { ConnctionState } from "../../types";
import { FeedState } from "./types";

const initialState: FeedState = {
  state: ConnctionState.INITIAL,
  orders: [],
  total: null,
  totalToday: null,
};

export const feedSlice = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    initStart: (state) => {
      state.state = ConnctionState.CONNECTING;
    },
    initSuccess: (state) => {
      state.state = ConnctionState.CONNECTED;
    },
    initError: (state) => {
      state.state = ConnctionState.ERROR;
    },
    close: (state) => {
      state.state = ConnctionState.CLOSED;
    },
    send: (state) => {
      return state;
    },
    setMessage: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { initStart, initSuccess, initError, close, setMessage, send } =
  feedSlice.actions;

export const feedReducer = feedSlice.reducer;
