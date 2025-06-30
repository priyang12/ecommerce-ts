describe("Payment Method Page", () => {
  beforeEach(() => {
    // Simulate login and add address to context (or mock localStorage/context)
    cy.loginByApi();
    localStorage.setItem(
      "checkout-address",
      JSON.stringify({
        address: "123 Test St",
        city: "Testville",
        postalcode: "123456",
      })
    );

    cy.visit("/checkout/paymentMethod");
  });

  it("should redirect to address page if no address in state", () => {
    localStorage.removeItem("checkout-address");
    cy.visit("/checkout/paymentMethod");

    cy.url().should("include", "/checkout/address");
  });

  it("should default to 'PayPal or Credit Card' selected", () => {
    cy.get('[data-testid="PayPalButton"]').should("be.checked");
    cy.get('[data-testid="CashButton"]').should("not.be.checked");
  });

  it("should allow selecting 'Cash on Delivery'", () => {
    cy.get('[data-testid="CashButton"]').check({ force: true });
    cy.get('[data-testid="CashButton"]').should("be.checked");
    cy.get('[data-testid="PayPalButton"]').should("not.be.checked");
  });

  it("should save selected method to localStorage and navigate on submit", () => {
    cy.get('[data-testid="CashButton"]').check({ force: true });

    cy.get('input[type="submit"]').click();

    cy.url().should("include", "/checkout/PlaceOrder");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("payMethod")).to.eq("Cash on Delivery");
    });
  });

  it("should associate labels correctly with radio inputs", () => {
    cy.get('label[for="PayMethod"]').should(
      "contain.text",
      "PayPal or Credit Card"
    );
    cy.get('label[for="PayMethod"]').should("contain.text", "Cash on Delivery");
  });
});
