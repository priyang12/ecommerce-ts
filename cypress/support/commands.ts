import "@testing-library/cypress/add-commands";

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/Auth");

  cy.findByLabelText("email").type(email, { force: true });
  cy.findByLabelText("Password").type(password, { force: true });
  cy.get("form").submit();
});

// -- This is a child command -
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
