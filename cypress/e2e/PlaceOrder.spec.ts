describe("Place Order Page", () => {
  beforeEach(() => {
    // Custom login and state setup
    cy.loginByApi(); // Custom command, simulate auth

    // Mock address & payment method in localStorage/context
    localStorage.setItem(
      "checkout-address",
      JSON.stringify({
        address: "123 Test St",
        city: "Testville",
        postalcode: "123456",
      })
    );

    cy.visit("/checkout/placeOrder");
  });

  it("should redirect to /checkout/address if no address", () => {
    localStorage.removeItem("checkout-address");
    cy.visit("/checkout/placeOrder");
    cy.url().should("include", "/checkout/address");
  });

  it("should redirect to /checkout/paymentMethod if no payment method", () => {
    localStorage.setItem(
      "checkoutState",
      JSON.stringify({
        address: {
          address: "123 Test Street",
          city: "Testville",
          postalcode: "123456",
        },
        payMethod: null,
      })
    );
    cy.visit("/checkout/placeOrder");
    cy.url().should("include", "/checkout/paymentMethod");
  });

  it("should redirect to cart page if cart is empty", () => {
    cy.intercept("GET", "**/cart", {
      statusCode: 200,
      body: {
        products: [],
      },
    });

    cy.visit("/checkout/placeOrder");
    // this will redirect to paymentMethod

    // we need to redirect to placeOrders from paymentMethod page
    cy.get('input[type="submit"]').click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should display address and payment method", () => {
    // we need to redirect to placeOrders from paymentMethod page
    cy.get('input[type="submit"]').click();

    cy.contains("Address: 123 Test St , Testville ,123456,").should("exist");
    cy.contains("Method: PayPal or Credit Card").should("exist");
  });

  it("should render cart items and summary from API", () => {
    const token = window.localStorage.getItem("token");

    console.log(token);

    cy.request({
      method: "GET",
      url: `${Cypress.config("baseUrl")}/api/cart`,
      headers: {
        "x-auth-token": token,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);

      const cartItems = response.body.products;

      expect(cartItems).to.be.an("array").and.not.be.empty;

      // Submit payment form to navigate to PlaceOrder
      cy.get('input[type="submit"]').click();

      // Validate each cart item is rendered
      cartItems.forEach((item) => {
        cy.contains(item.product.name).should("exist");
      });

      // Compute expected amounts

      const ProductsAmount = cartItems
        ? cartItems.reduce((pre, current) => {
            return (pre += current.product.price * current.qty);
          }, 0)
        : 0;
      const roundedProductAmount = ProductsAmount.toFixed(2);
      const ShippingAmount = ProductsAmount > 500 ? 0 : 100;
      const TaxAmount = +(0.15 * ProductsAmount).toFixed(2);
      const TotalAmount = +(
        ProductsAmount +
        ShippingAmount +
        TaxAmount
      ).toFixed(2);

      // Assert computed values on screen
      cy.get('[data-testid="ShippingCost"]').should(
        "have.text",
        ShippingAmount
      );
      cy.get('[data-testid="TaxCost"]').should("contain.text", TaxAmount);
      cy.get('[data-testid="TotalAmount"]').should("contain.text", TotalAmount);
    });
  });

  it("should submit the order and navigate to /checkout/paypal", () => {
    // we need to redirect to placeOrders from paymentMethod page
    cy.get('input[type="submit"]').click();

    cy.get('[data-testid="PlaceOrder"]').within(() => {
      cy.get('input[type="submit"]').click();
    });

    cy.url().should("include", "/checkout/paypal");
  });
});
