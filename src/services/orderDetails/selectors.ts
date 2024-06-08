import { RootState } from "../../store";

export const getOrderDetails = (state: RootState) => {
  return state.orderDetails;
};
