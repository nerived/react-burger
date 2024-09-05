import {
  bunIngredient,
  constructorSpace,
  constructorBunSpace,
  modalClose,
  modalIngredient,
  modalOrder,
  ingredientName,
  ingredientCalories,
  ingredientProteins,
  ingredientFat,
  ingredientCarbohydrates,
  placeOrderButton,
  orderNumber,
  orderName,
} from "../../support/elements-selectors";

describe("Constructor", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      "accessToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
    );
    cy.visit("");
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" });
  });

  it("should contain ingredient after DND", () => {
    cy.fillConstuctor();

    cy.get(constructorBunSpace).should("contain", "Краторная булка N-200i");
    cy.get(constructorSpace).should(
      "contain",
      "Биокотлета из марсианской Магнолии"
    );
    cy.get(constructorSpace).should("contain", "Соус Spicy-X");
  });

  it("should open modal by click on ingredient and close modal after click close icon", () => {
    cy.get(bunIngredient).click();
    cy.get(modalIngredient).should("exist");
    cy.get(modalClose).click();
    cy.get(modalIngredient).should("not.exist");
  });

  it("should open modal by click on ingredient and close modal after click ESC key", () => {
    cy.get(bunIngredient).click();
    cy.get(modalIngredient).should("exist");
    cy.get("body").trigger("keydown", { key: "Escape" });
    cy.get(modalIngredient).should("not.exist");
  });

  it("should open modal and contain ingredient details after click", () => {
    cy.get(bunIngredient).click();
    cy.get(ingredientName).should("have.text", "Краторная булка N-200i");
    cy.get(ingredientCalories).should("have.text", 420);
    cy.get(ingredientProteins).should("have.text", 80);
    cy.get(ingredientFat).should("have.text", 24);
    cy.get(ingredientCarbohydrates).should("have.text", 53);
  });

  it("should open order modal after order button click ", () => {
    cy.fillConstuctor();

    cy.get(placeOrderButton).click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get(placeOrderButton).click();
    cy.get(modalOrder).should("exist");
    cy.get(orderNumber).should("have.text", 51978);
    cy.get(orderName).should(
      "have.text",
      "Флюоресцентный люминесцентный бургер"
    );
  });
});
