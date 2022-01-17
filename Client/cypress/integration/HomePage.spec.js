beforeEach(function () {
  cy.visit("/");
});
it("front page can be opened", function () {
  cy.contains("Product Display");
});
it("Login/Register Should exist on unAuth", () => {
  cy.contains("Login/Register");
  cy.contains("Login/Register").click();
  cy.url().should("include", "/Auth");
});
it("Click on iphone Product", () => {
  cy.contains("iPhone").click();
  cy.url().should("include", "/product/60d5e622e5179e2bb44bd839");
});
