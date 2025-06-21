import "@testing-library/cypress/add-commands";
import { AdminUser } from "../../data/userData";

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/Auth");

  cy.findByLabelText("email").type(email, { force: true });
  cy.findByLabelText("Password").type(password, { force: true });
  cy.get("form").submit();
});

Cypress.Commands.add("loginByApi", () => {
  cy.request("POST", `${Cypress.config("baseUrl")}/api/users/login`, {
    email: AdminUser.email,
    password: AdminUser.password,
  }).then((response) => {
    const { token } = response.body;
    window.localStorage.setItem("token", token);
  });
});
