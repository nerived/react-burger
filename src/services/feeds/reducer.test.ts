import { ConnctionState } from "../../types";

import {
  initStart,
  initSuccess,
  initError,
  close,
  send,
  setMessage,
  feedReducer,
  feedsInitialState,
} from "./reducer";

describe("Feed reducer", () => {
  it("should return the initial state", () => {
    expect(feedReducer(undefined, { type: "unknown" })).toEqual(
      feedsInitialState
    );
  });

  it("should handle a initStart", () => {
    expect(feedReducer(feedsInitialState, initStart())).toEqual({
      state: ConnctionState.CONNECTING,
      orders: [],
      total: null,
      totalToday: null,
    });
  });

  it("should handle a initSuccess", () => {
    expect(feedReducer(feedsInitialState, initSuccess())).toEqual({
      state: ConnctionState.CONNECTED,
      orders: [],
      total: null,
      totalToday: null,
    });
  });

  it("should handle a initError", () => {
    expect(feedReducer(feedsInitialState, initError())).toEqual({
      state: ConnctionState.ERROR,
      orders: [],
      total: null,
      totalToday: null,
    });
  });
  it("should handle a close", () => {
    expect(feedReducer(feedsInitialState, close())).toEqual({
      state: ConnctionState.CLOSED,
      orders: [],
      total: null,
      totalToday: null,
    });
  });
  it("should handle a send", () => {
    expect(feedReducer(feedsInitialState, send())).toEqual(feedsInitialState);
  });

  it("should handle a setMessage", () => {
    const testPayload = {
      orders: [{ ingredients: ["231213", "321312"] }],
      total: 132312,
      totalToday: 123,
    };
    expect(feedReducer(feedsInitialState, setMessage(testPayload))).toEqual({
      state: ConnctionState.INITIAL,
      orders: [{ ingredients: ["231213", "321312"] }],
      total: 132312,
      totalToday: 123,
    });
  });
});
