describe("Cart Page", () => {
  beforeEach(() => {
    cy.loginByApi().then(() => {
      cy.visit("/cart");
    });
  });

  it("should fetch and display cart items correctly", () => {
    const token = window.localStorage.getItem("token");

    cy.request({
      method: "GET",
      url: `${Cypress.config("baseUrl")}/api/cart`,
      headers: {
        "x-auth-token": token,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      const cartItems = response.body.products;
      expect(cartItems).to.be.an("array");

      if (cartItems.length === 0) {
        cy.contains("Your Cart is Empty").should("exist");
      } else {
        // Check the number of items
        cy.get('[data-testid="cart-item"]').should(
          "have.length",
          cartItems.length
        );

        // Check subtotal value
        const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
        const totalPrice = cartItems
          .reduce((sum, item) => sum + item.qty * item.product.price, 0)
          .toFixed(2);

        cy.contains(`SUBTOTAL (${totalQty}) ITEMS`).should("exist");
        cy.contains(`$ ${totalPrice}`).should("exist");
      }
    });
  });

  it("should redirect to /checkout/address on clicking Checkout", () => {
    cy.get("button").contains("Checkout").click();
    cy.url().should("include", "/checkout/address");
  });

  it("should allow removing an item from the cart", () => {
    cy.get('[data-testid="cart-item"]').then((items) => {
      if (items.length > 0) {
        cy.get('[data-testid="cart-item"]')
          .first()
          .within(() => {
            cy.get('[data-testid="DeleteIcon"]').click();
          });

        cy.wait(1000);
        cy.get('[data-testid="cart-item"]').should(
          "have.length.lessThan",
          items.length
        );
      } else {
        cy.contains("Your Cart is Empty").should("exist");
      }
    });
  });
});
