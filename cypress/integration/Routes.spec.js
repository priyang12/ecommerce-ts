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

// Admin Routes
it("Test Admin Routes", () => {
  cy.get('input[name="email"]').type("fdsaasdsaf@gmail.com");
  cy.get('input[name="password"]').type("123123");
  cy.get("form").submit(); // <-- add this

  cy.url().should("eq", "http://localhost:3000/");

  //check for User Name
  cy.contains("NewUser");

  cy.visit("/AdminDashboard");
  // IT SHOULD BE REDIRECTED TO HOME PAGE
  cy.url().should("include", "/Home");

  cy.visit("/AdminOrders");
  // // IT SHOULD BE REDIRECTED TO HOME PAGE
  cy.url().should("include", "/Home");

  cy.visit("/AdminProducts");
  // // IT SHOULD BE REDIRECTED TO HOME PAGE
  cy.url().should("include", "/Home");

  cy.visit("/AdminUsers");
  // // IT SHOULD BE REDIRECTED TO HOME PAGE
  cy.url().should("include", "/Home");
});
