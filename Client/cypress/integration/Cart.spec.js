beforeEach(function () {
  localStorage.setItem("token", Cypress.env("Token"));
  cy.visit("/Cart");
});

it("Check Cart", () => {
  // Cart is empty
  if (cy.contains("Your Cart is Empty")) {
    cy.visit("/");
    const href = [];
    // eslint-disable-next-line cypress/no-assigning-return-values
    const products = cy.get('section[id="Products"]').find("article");
    products.each(($el, _index, _$list) => {
      href.push($el.find("a").attr("href"));
      cy.visit($el.find("a").attr("href"));
      // check if add to cart button is present
      cy.get("button").contains("Add to Cart").click();

      if (cy.contains("Status: Out In Stock")) {
        cy.visit("/");
      } else {
        cy.get("body").then(($body) => {
          // find button by text
          cy.get($body).find("button").contains("Add to Cart").click();
        });
      }
    });
    // cy.get('button[name="ADD TO CART"]').click();
    // cy.visit("/Cart");
  }
  //   cy.get('select[name="qty"]').select("2");
});
