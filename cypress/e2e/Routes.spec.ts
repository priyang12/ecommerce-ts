beforeEach(function () {
  cy.visit("/auth");
});
it("Test Private Routes", () => {
  cy.visit("/cart");
  cy.url().should("include", "/auth/login?redirectTo=/cart");

  cy.visit("/placeOrder");
  cy.url().should("include", "/auth/login?redirectTo=/placeOrder");

  cy.visit("/orderStatus");
  cy.url().should("include", "/auth/login?redirectTo=/orderStatus");

  cy.visit("/payment");
  cy.url().should("include", "/auth/login?redirectTo=/payment");

  cy.visit("/address");
  cy.url().should("include", "/auth/login?redirectTo=/address");
});
