import { ConnctionState, TOrder } from "../../types";

export type HistoryState = {
  state: ConnctionState;
  orders: TOrder[];
  total: null | number;
  totalToday: null | number;
};
