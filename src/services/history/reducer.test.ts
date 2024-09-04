import { ConnctionState } from "../../types";

import {
  initStart,
  initSuccess,
  initError,
  close,
  send,
  setMessage,
  historyReducer,
  historyInitialState,
} from "./reducer";

describe("History reducer", () => {
  it("should return the initial state", () => {
    expect(historyReducer(undefined, { type: "unknown" })).toEqual(
      historyInitialState
    );
  });

  it("should handle a initStart", () => {
    expect(historyReducer(historyInitialState, initStart())).toEqual({
      state: ConnctionState.CONNECTING,
      orders: [],
      total: null,
      totalToday: null,
    });
  });

  it("should handle a initSuccess", () => {
    expect(historyReducer(historyInitialState, initSuccess())).toEqual({
      state: ConnctionState.CONNECTED,
      orders: [],
      total: null,
      totalToday: null,
    });
  });

  it("should handle a initError", () => {
    expect(historyReducer(historyInitialState, initError())).toEqual({
      state: ConnctionState.ERROR,
      orders: [],
      total: null,
      totalToday: null,
    });
  });
  it("should handle a close", () => {
    expect(historyReducer(historyInitialState, close())).toEqual({
      state: ConnctionState.CLOSED,
      orders: [],
      total: null,
      totalToday: null,
    });
  });
  it("should handle a send", () => {
    expect(historyReducer(historyInitialState, send())).toEqual(
      historyInitialState
    );
  });

  it("should handle a setMessage", () => {
    const testPayload = {
      orders: [{ ingredients: ["231213", "321312"] }],
      total: 132312,
      totalToday: 123,
    };
    expect(
      historyReducer(historyInitialState, setMessage(testPayload))
    ).toEqual({
      state: ConnctionState.INITIAL,
      orders: [{ ingredients: ["231213", "321312"] }],
      total: 132312,
      totalToday: 123,
    });
  });
});
