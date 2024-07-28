import { Middleware, MiddlewareAPI } from "redux";

import { AppDispatch, RootState } from "../store";
import { ConnctionState } from "../types";
import { feedSlice, feedsSelectors } from "../services/feeds";
import { historySlice, historySelectors } from "../services/history";
import { userSelectors } from "../services/user";
import * as storage from "../services/storage";
import { WS_FEED_URL } from "../constants";

export const socketMidlleware = (
  url: string,
  actions: typeof feedSlice.actions | typeof historySlice.actions
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    return (next) => {
      return (action: any) => {
        const { dispatch, getState } = store;
        const { type } = action;
        const { initStart, initSuccess, initError, close, setMessage } =
          actions;
        const isLoggedIn = userSelectors.getUserIsLoggedIn(getState());
        const historyState = historySelectors.getHistoryState(getState());
        const feedsState = feedsSelectors.getFeedsState(getState());

        const state = url === WS_FEED_URL ? feedsState : historyState;

        if (type === initStart.type && state !== ConnctionState.CONNECTING) {
          let token = storage.get("accessToken");

          socket = new WebSocket(
            `${url}${
              type === initStart.type && isLoggedIn ? `?token=${token}` : ""
            }`
          );
        }
        if (socket) {
          socket.onopen = () => {
            dispatch(initSuccess());
          };
          socket.onerror = () => {
            dispatch(initError());
          };
          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            const { success } = parsedData;
            success && dispatch(setMessage(parsedData));
          };
        }
        if (
          socket &&
          type === close.type &&
          state !== ConnctionState.CONNECTING
        ) {
          socket.close(1000);
          socket.onclose = (event) => {
            dispatch(close());
          };
        }
        next(action);
      };
    };
  };
};
