import { AdminUser } from "../../data/userData";

beforeEach(function () {
  cy.visit("/Auth/login");
});

it("Input Invalid Email and Invalid Password", () => {
  cy.findByLabelText("Email").type("wrongEmail", { force: true });
  cy.findByLabelText("Password").type("123", { force: true });
  cy.get("form").submit();
  cy.contains(/Invalid email/);
  cy.contains(/Password must be at least 6/);
});

it("Input Valid Email and Wrong Password", () => {
  cy.findByLabelText("Email").type(AdminUser.email, { force: true });
  cy.findByLabelText("Password").type("wrongPassword", { force: true });
  cy.get("form").submit(); // <-- add this
  cy.contains(/Invalid email or password/);
});

it("Input Valid Email and Password and Logout", () => {
  cy.findByLabelText("Email").type(AdminUser.email, { force: true });
  cy.findByLabelText("Password").type(AdminUser.password, { force: true });

  cy.get("form").submit();

  //check for login success
  cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  //check for User Name
  cy.contains(AdminUser.name);

  // Logout
  cy.get(".Dropdown-btn").click({ force: true });
  //click on logout
  cy.get(".dropdown-content").contains("Logout").click({ force: true });
});
