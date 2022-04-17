it("Payment Process", () => {
  cy.visit("/");
  const token = Cypress.env("token");
  localStorage.setItem("token", token);

  //Grab Products ID
  cy.get(".product").each(($el) => {
    cy.log($el);
    cy.wrap($el).click();
    // cy.go("back");
  });
  //   cy.get(".product").eq(0).click();
  //   if (cy.get('h3[name="Status: Out In Stock"]')) cy.go("back");
  //   cy.get(".product").eq(1).click();
  //   cy.visit("Cart");
  //   cy.go("back");
});
