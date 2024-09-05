import { resetUser, setUser, userInitialState, userReducer } from "./reducer";
import { fetchUser, updateUser } from "./thunks";

describe("User reducer", () => {
  const previousState = {
    email: "test@test.test",
    name: "Test",
  };

  it("should return the initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(
      userInitialState
    );
  });

  it("should handle set user data", () => {
    expect(userReducer(userInitialState, setUser(previousState))).toEqual(
      previousState
    );
  });

  it("should process successful fetch user", () => {
    const action = { type: fetchUser.fulfilled.type, payload: previousState };
    const actual = userReducer(userInitialState, action);
    expect(actual).toEqual(previousState);
  });

  it("should process unsuccessful fetch user", () => {
    const action = { type: fetchUser.rejected.type };
    const actual = userReducer(previousState, action);
    expect(actual).toEqual(userInitialState);
  });

  it("should process successful update user", () => {
    const action = { type: updateUser.fulfilled.type, payload: previousState };
    const actual = userReducer(userInitialState, action);
    expect(actual).toEqual(previousState);
  });

  it("should handle reset slice", () => {
    expect(userReducer(previousState, resetUser())).toEqual(userInitialState);
  });
});
