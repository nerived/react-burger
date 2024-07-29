import { createSlice } from "@reduxjs/toolkit";

import { ConnctionState } from "../../types";
import { HistoryState } from "./types";

const initialState: HistoryState = {
  state: ConnctionState.INITIAL,
  orders: [],
  total: null,
  totalToday: null,
};

export const historySlice = createSlice({
  name: "history",
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
  historySlice.actions;

export const historyReducer = historySlice.reducer;
