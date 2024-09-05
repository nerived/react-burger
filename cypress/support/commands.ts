import {
  bunIngredient,
  mainIngredient,
  sauceIngredient,
  constructorSpace,
  constructorEmptySpace,
} from "./elements-selectors";

declare global {
  namespace Cypress {
    interface Chainable {
      fillConstuctor(): Chainable;
    }
  }
}

Cypress.Commands.add("fillConstuctor", () => {
  cy.get(bunIngredient).trigger("dragstart");
  cy.get(constructorEmptySpace).trigger("drop");
  cy.get(mainIngredient).trigger("dragstart");
  cy.get(constructorEmptySpace).trigger("drop");
  cy.get(sauceIngredient).trigger("dragstart");
  cy.get(constructorSpace).trigger("drop");
});
