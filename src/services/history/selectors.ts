import { RootState } from "../../store";

export const getHistory = (state: RootState) => {
  return state.history;
};

export const getHistoryOrders = (state: RootState) => {
  return getHistory(state).orders;
};

export const getHistoryState = (state: RootState) => {
  return getHistory(state).state;
};

export const getHistoryByNumber = (state: RootState, number: string) => {
  return getHistoryOrders(state).find(
    (history) => String(history.number) === number
  );
};
