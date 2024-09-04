describe("Constructor", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDhiZTk1MTE5ZDQ1MDAxYjUwNDRiYSIsImlhdCI6MTcyNTQ4MjY4NCwiZXhwIjoxNzI1NDgzODg0fQ.ks4D8dpDlHXZVVejZarNpRGJChOWmpjUvXCpblZ6Q3w"
      )
    );
    cy.visit("http://localhost:3000");
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" });
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" });
  });

  it("should contain ingredient after DND", () => {
    cy.get("[data-testid=643d69a5c3f7b9001cfa093c]").trigger("dragstart");
    cy.get("[data-testid=constructor-empty]").trigger("drop");
    cy.get("[data-testid=643d69a5c3f7b9001cfa0941]").trigger("dragstart");
    cy.get("[data-testid=constructor-empty]").trigger("drop");
    cy.get("[data-testid=643d69a5c3f7b9001cfa0942]").trigger("dragstart");
    cy.get("[data-testid=constructor]").trigger("drop");

    cy.get("[data-testid=constructor-bun]").should(
      "contain",
      "Краторная булка N-200i"
    );
    cy.get("[data-testid=constructor]").should(
      "contain",
      "Биокотлета из марсианской Магнолии"
    );
    cy.get("[data-testid=constructor]").should("contain", "Соус Spicy-X");
  });

  it("should open modal by click on ingredient and close modal after click close icon", () => {
    cy.get("[data-testid=643d69a5c3f7b9001cfa093c]").click();
    cy.get("[data-testid=modal-ingredient]").should("exist");
    cy.get("[data-testid=modal-close]").click();
    cy.get("[data-testid=modal-ingredient]").should("not.exist");
  });

  it("should open modal by click on ingredient and close modal after click ESC key", () => {
    cy.get("[data-testid=643d69a5c3f7b9001cfa093c]").click();
    cy.get("[data-testid=modal-ingredient]").should("exist");
    cy.get("body").trigger("keydown", { key: "Escape" });
    cy.get("[data-testid=modal-ingredient]").should("not.exist");
  });

  it("should open modal and contain ingredient details after click", () => {
    cy.get("[data-testid=643d69a5c3f7b9001cfa093c]").click();
    cy.get("[data-testid=ingredient-name]").should(
      "have.text",
      "Краторная булка N-200i"
    );

    cy.get("[data-testid=ingredient-calories]").should("have.text", 420);

    cy.get("[data-testid=ingredient-proteins]").should("have.text", 80);

    cy.get("[data-testid=ingredient-fat]").should("have.text", 24);

    cy.get("[data-testid=ingredient-carbohydrates]").should("have.text", 53);
  });

  it("should open order modal after order button click ", () => {
    cy.get("[data-testid=643d69a5c3f7b9001cfa093c]").trigger("dragstart");
    cy.get("[data-testid=constructor-empty]").trigger("drop");
    cy.get("[data-testid=643d69a5c3f7b9001cfa0941]").trigger("dragstart");
    cy.get("[data-testid=constructor-empty]").trigger("drop");
    cy.get("[data-testid=643d69a5c3f7b9001cfa0942]").trigger("dragstart");
    cy.get("[data-testid=constructor]").trigger("drop");
    cy.get("[data-testid=place-order-button]").click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.get("[data-testid=place-order-button]").click();
    cy.get("[data-testid=modal-order]").should("exist");
    cy.get("[data-testid=order-number]").should("have.text", 51978);
    cy.get("[data-testid=order-name]").should(
      "have.text",
      "Флюоресцентный люминесцентный бургер"
    );
  });
});
