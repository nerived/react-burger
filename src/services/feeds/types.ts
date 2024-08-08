import { ConnctionState, TOrder } from "../../types";

export type FeedState = {
  state: ConnctionState;
  orders: TOrder[];
  total: null | number;
  totalToday: null | number;
};
