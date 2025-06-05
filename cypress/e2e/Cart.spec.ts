import { AdminUser } from "../../data/userData";
import Products from "../../data/productsData";

beforeEach(function () {
  cy.login(AdminUser.email, AdminUser.password);
});

it("Add , Update, Remove Cart", () => {
  cy.findByText("CART").click();
  cy.visit("/");
  // add to cart
  cy.findByText(Products[3].name).click();
  cy.findByText("ADD TO CART").click();

  cy.visit("/Cart");
  cy.findByText(Products[3].name).should("exist");
  cy.findByText(Products[3].price).should("exist");

  // update cart
  cy.findByLabelText("Qty :").select("3");
  cy.findByText(/Updated to 3/).should("exist");

  cy.contains(`SUBTOTAL (3) ITEMS`).should("exist");
  cy.contains(`${Math.round(Products[3].price * 3 * 100) / 100}`).should(
    "exist"
  );

  cy.findByText("Checkout").click().url().should("include", "/address");

  // remove cart
  cy.visit("/Cart");
  cy.findByTestId("DeleteIcon").click();
  cy.findByText(Products[3].name).should("not.exist");
  cy.findByText(Products[3].price).should("not.exist");

  cy.contains("Your Cart is Empty");
});
