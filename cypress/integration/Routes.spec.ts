beforeEach(function () {
  cy.visit("/Auth");
});
it("Test Private Routes", () => {
  cy.visit("/cart");
  // IT SHOULD BE REDIRECTED TO LOGIN PAGE
  cy.url().should("include", "/Auth");

  cy.visit("/PlaceOrder");
  // IT SHOULD BE REDIRECTED TO LOGIN PAGE
  cy.url().should("include", "/Auth");

  cy.visit("/OrderStatus");
  // IT SHOULD BE REDIRECTED TO LOGIN PAGE
  cy.url().should("include", "/Auth");

  cy.visit("/payment");
  // IT SHOULD BE REDIRECTED TO LOGIN PAGE
  cy.url().should("include", "/Auth");

  cy.visit("/address");
  // IT SHOULD BE REDIRECTED TO LOGIN PAGE
  cy.url().should("include", "/Auth");
});
