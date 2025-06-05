beforeEach(function () {
  cy.visit("/");
});

it("Click on iphone Product", () => {
  cy.contains("iPhone").click();
  cy.url().should("include", "/product/60d5e622e5179e2bb44bd839");
});

it("Search Product", () => {
  cy.get('input[name="search"]').type("iphone");

  //click on Find button
  cy.get("button").contains("Find").click();

  cy.url().should("include", "/name=iphone");

  // check for iphone product
  cy.get(".CardTitle").contains("iPhone");

  cy.get('input[name="search"]').clear();
  // // check for Search Product Enter
  cy.get('input[name="search"]').type("Not Found {enter}");

  cy.contains(/No Products Found/);
});
