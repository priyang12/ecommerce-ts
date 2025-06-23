import "@testing-library/cypress/add-commands";
import { AdminUser } from "../../data/userData";

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/Auth");

  cy.findByLabelText("email").type(email, { force: true });
  cy.findByLabelText("Password").type(password, { force: true });
  cy.get("form").submit();
});

Cypress.Commands.add(
  "loginByApi",
  (email = AdminUser.email, password = AdminUser.email) => {
    cy.request("POST", `${Cypress.config("baseUrl")}/api/users/login`, {
      email: email,
      password: password,
    }).then((response) => {
      const { token } = response.body;
      window.localStorage.setItem("token", token);
    });
  }
);

Cypress.Commands.add("applyCommandDelay", (delay = 0) => {
  if (delay > 0) {
    ["visit", "click", "trigger", "type", "clear", "reload", "select"].forEach(
      (command: any) => {
        Cypress.Commands.overwrite(command, (originalFn, ...args) => {
          const origVal = originalFn(...args);
          return new Promise((resolve) => {
            setTimeout(() => resolve(origVal), delay);
          });
        });
      }
    );
  }
});
