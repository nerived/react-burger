import {
  updateIngredientCount,
  resetIngredientsCount,
  resetIngredients,
  ingredientsInitialState,
  ingredientsReducer,
} from "./reducer";
import { fetchIngredients } from "./thunks";
import { Ingredient } from "../../types";

describe("Ingredient reducer", () => {
  const previousState = [
    {
      _id: "1",
      count: 20,
    },
    {
      _id: "2",
      count: 5,
    },
  ] as Ingredient[];

  it("should return the initial state", () => {
    expect(ingredientsReducer(undefined, { type: "unknown" })).toEqual(
      ingredientsInitialState
    );
  });

  it("should handle updateIngredientCount", () => {
    const testPayload = {
      id: "2",
      count: 50,
    };

    expect(
      ingredientsReducer(previousState, updateIngredientCount(testPayload))
    ).toEqual([
      {
        _id: "1",
        count: 20,
      },
      {
        _id: "2",
        count: 50,
      },
    ]);
  });

  it("should handle resetIngredientsCount", () => {
    expect(ingredientsReducer(previousState, resetIngredientsCount())).toEqual([
      {
        _id: "1",
        count: 0,
      },
      {
        _id: "2",
        count: 0,
      },
    ]);
  });

  it("should process successful fetch ingredients", () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: previousState,
    };
    const actual = ingredientsReducer(ingredientsInitialState, action);
    expect(actual).toEqual(previousState);
  });

  it("should process unsuccessful fetch ingredients", () => {
    const action = { type: fetchIngredients.rejected.type };
    const actual = ingredientsReducer(previousState, action);
    expect(actual).toEqual(ingredientsInitialState);
  });

  it("should handle reset slice", () => {
    expect(ingredientsReducer(previousState, resetIngredients())).toEqual(
      ingredientsInitialState
    );
  });
});
