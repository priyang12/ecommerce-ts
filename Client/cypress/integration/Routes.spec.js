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

// Admin Routes
it("Test Admin Routes", () => {
  cy.visit("/AdminDashboard");
  // IT SHOULD BE REDIRECTED TO HOME PAGE
  cy.url().should("include", "/Home");

  cy.visit("/AdminOrders");
  // IT SHOULD BE REDIRECTED TO HOME PAGE
  cy.url().should("include", "/Home");

  cy.visit("/AdminProducts");
  // IT SHOULD BE REDIRECTED TO HOME PAGE
  cy.url().should("include", "/Home");

  cy.visit("/AdminUsers");
  // IT SHOULD BE REDIRECTED TO HOME PAGE
  cy.url().should("include", "/Home");
});
