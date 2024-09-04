import {
  resetOrderDetails,
  orderDetailsReducer,
  orderDetailsInitialState,
} from "./reducer";
import { sendOrderData } from "./thunks";

describe("Order Details reducer", () => {
  const previousState = {
    name: "Name",
    number: 1312123,
  };

  it("should return the initial state", () => {
    expect(orderDetailsReducer(undefined, { type: "unknown" })).toEqual(
      orderDetailsInitialState
    );
  });

  it("should process successful order placement", () => {
    const action = {
      type: sendOrderData.fulfilled.type,
      payload: previousState,
    };
    const actual = orderDetailsReducer(orderDetailsInitialState, action);
    expect(actual).toEqual(previousState);
  });

  it("should process unsuccessful order placement", () => {
    const action = { type: sendOrderData.rejected.type };
    const actual = orderDetailsReducer(previousState, action);
    expect(actual).toEqual(orderDetailsInitialState);
  });

  it("should handle reset slice", () => {
    expect(orderDetailsReducer(previousState, resetOrderDetails())).toEqual(
      orderDetailsInitialState
    );
  });
});
