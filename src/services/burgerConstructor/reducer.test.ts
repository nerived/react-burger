import {
  updateBunId,
  ingredientAdded,
  updateSorting,
  ingredientDeleted,
  resetConstructor,
  burgerConstructorReducer,
  burgerConstructorInitialState,
} from "./reducer";

describe("Burger constructor reducer", () => {
  it("should return the initial state", () => {
    expect(burgerConstructorReducer(undefined, { type: "unknown" })).toEqual(
      burgerConstructorInitialState
    );
  });

  it("should handle a bunId being added to reducer bunId", () => {
    const testBunId = "12345";

    expect(
      burgerConstructorReducer(
        burgerConstructorInitialState,
        updateBunId(testBunId)
      )
    ).toEqual({
      bunId: testBunId,
      ingredientIds: [],
    });
  });

  it("should handle a ingredientId being added to reducer ingredientIds", () => {
    const testBunId = "12345";

    expect(
      burgerConstructorReducer(
        burgerConstructorInitialState,
        ingredientAdded(testBunId)
      )
    ).toEqual({
      bunId: "",
      ingredientIds: [testBunId],
    });
  });

  it("should handle updating/replace the order of ingredients", () => {
    const previousState = {
      bunId: "",
      ingredientIds: ["123", "1234", "12345"],
    };

    expect(
      burgerConstructorReducer(
        previousState,
        updateSorting(["543", "5432", "54321"])
      )
    ).toEqual({
      bunId: "",
      ingredientIds: ["543", "5432", "54321"],
    });
  });

  it("should handle ingredient removal", () => {
    const previousState = {
      bunId: "",
      ingredientIds: ["123", "1234", "12345"],
    };

    expect(
      burgerConstructorReducer(previousState, ingredientDeleted("1234"))
    ).toEqual({
      bunId: "",
      ingredientIds: ["123", "12345"],
    });
  });

  it("should handle reset slice", () => {
    const previousState = {
      bunId: "1231",
      ingredientIds: ["123", "1234", "12345"],
    };

    expect(burgerConstructorReducer(previousState, resetConstructor())).toEqual(
      burgerConstructorInitialState
    );
  });
});
