import { Middleware, MiddlewareAPI } from "redux";

import { AppDispatch, RootState } from "../store";
import { feedSlice } from "../services/feeds";
import { historySlice } from "../services/history";
import { userSelectors } from "../services/user";
import * as storage from "../services/storage";

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
        const { initStart, initSuccess, initError, close, setMessage, send } =
          actions;
        const isLoggedIn = userSelectors.getUserIsLoggedIn(getState());

        if (type === initStart.type) {
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
        if (socket && type === close.type) {
          socket.close(1000);
          socket.onclose = (event) => {
            dispatch(close());
          };
        }
        if (socket && type === send.type) {
          socket.send(JSON.stringify(action.payload));
        }
        next(action);
      };
    };
  };
};
