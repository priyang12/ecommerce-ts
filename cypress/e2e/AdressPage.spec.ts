describe("Address Page", () => {
  beforeEach(() => {
    cy.loginByApi(); // Custom command to simulate login
    cy.visit("/checkout/address");
  });

  it("should allow user to fill and submit valid address form", () => {
    cy.get('input[name="address"]').type("123 Test Street", { force: true });
    cy.get('input[name="city"]').type("Testville", { force: true });
    cy.get('input[name="postalcode"]').type("123456", { force: true });

    cy.get('input[type="submit"]').click();

    cy.url().should(
      "include",
      `${Cypress.config("baseUrl")}/checkout/paymentMethod`
    );
  });

  it("should show inline errors for invalid data (if applicable)", () => {
    cy.get('input[name="address"]').type("123 Test Street", { force: true });
    cy.get('input[name="city"]').type("T", { force: true });
    cy.get('input[name="postalcode"]').type("123", { force: true });

    cy.get('input[type="submit"]').click();

    cy.get('label[for="postalcode"]')
      .find(".error")
      .should("contain.text", "Invalid input");

    cy.get('label[for="City"]')
      .find(".error")
      .should("contain.text", "Invalid input");
  });

  it("should persist form state on revisit (if saved in context)", () => {
    // Fill out form
    cy.get('input[name="address"]').type("456 Another St", { force: true });
    cy.get('input[name="city"]').type("Anothertown", { force: true });
    cy.get('input[name="postalcode"]').type("678901", { force: true });

    cy.get('input[type="submit"]').click();

    cy.url().should(
      "include",
      `${Cypress.config("baseUrl")}/checkout/paymentMethod`
    );

    cy.visit("/checkout/address");

    cy.get('input[name="address"]').should("have.value", "456 Another St");
    cy.get('input[name="city"]').should("have.value", "Anothertown");
    cy.get('input[name="postalcode"]').should("have.value", "678901");
  });
});
