import { faker } from "@faker-js/faker";
import { AdminUser } from "../../data/userData";

beforeEach(function () {
  cy.visit("/Auth");
});

it("Input Invalid Email and Invalid Password", () => {
  cy.findByLabelText("Email").type("asdhsad", { force: true });
  cy.findByLabelText("Password").type("123", { force: true });
  cy.get("form").submit();
  cy.contains(/Invalid email/);
  cy.contains(/Password must be at least 6/);
});

it("Input Valid Email and Wrong Password", () => {
  cy.findByLabelText("Email").type("patelpriyang95@gmail.com", { force: true });
  cy.findByLabelText("Password").type("1234567", { force: true });
  cy.get("form").submit(); // <-- add this
  cy.contains(/Invalid email or password/);
});

it("Input Valid Email and Password and Logout", () => {
  cy.findByLabelText("Email").type(AdminUser.email, { force: true });
  cy.findByLabelText("Password").type(AdminUser.password, { force: true });

  cy.get("form").submit();

  //check for login success
  cy.url().should("eq", "http://localhost:3000/");
  //check for User Name
  cy.contains(AdminUser.name);

  // Logout
  cy.get(".Dropdown-btn").click({ force: true });
  //click on logout
  cy.get(".dropdown-content").contains("Logout").click({ force: true });
});

// Register New User
it("Register New User", () => {
  cy.get(".title").contains("Register").click();

  const User = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(20),
  };
  cy.findByLabelText("Name").type(User.name, { force: true });
  cy.findByLabelText("Email").type(User.email, { force: true });
  cy.findByLabelText("Password").type(User.password, { force: true });
  cy.findByLabelText("Confirm password").type(User.password, { force: true });
  cy.get("form").submit();
  //check for Register Success
  cy.contains(User.name);
  // Logout
  cy.get(".Dropdown-btn").click({ force: true });
  //click on logout
  cy.get(".dropdown-content").contains("Logout").click({ force: true });
});
