beforeEach(function () {
  cy.visit("/Cart");
});

it("Update Qty from Cart", () => {
  if (cy.contains("Your Cart is Empty")) {
    cy.visit("/product/60d5e622e5179e2bb44bd83b");
    cy.get('button[name="ADD TO CART"]').click();
    cy.visit("/Cart");
  }
  cy.get('select[name="qty"]').select("2");
});
