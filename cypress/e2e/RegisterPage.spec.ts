import users from "../../data/userData";

beforeEach(function () {
  cy.visit("/Auth/register");
});

// Register New User
it("invalid input", () => {
  cy.findByLabelText("Username").type("12", { force: true });
  cy.findByLabelText("Email").type("invalid@gam", { force: true });
  cy.findByLabelText("Password").type("1234", { force: true });
  cy.findByLabelText("Confirm password").type("12345", { force: true });
  cy.get("form").submit();

  cy.contains(/Name must be between 2 and 30 characters/);
  cy.contains(/Invalid email/);
  cy.contains(/Password must be at least 6 characters/);
  cy.contains(/Passwords do not match/);
});

it("Need Help redirect to StillWorking page", () => {
  // Check that the link exists and contains correct text
  cy.get(".help a")
    .should("exist")
    .and("have.text", " Need Help") // Note: there's a leading space
    .and("have.attr", "href", "/StillWorking");

  // Click the link
  cy.get(".help a").click();

  // Confirm navigation to the correct URL
  cy.location("pathname").should("eq", "/StillWorking");
});

// skip for now need to fix data seed and delete on test runs.
it.skip("Register New User", () => {
  cy.get(".title").contains("Register").click();
  const User = {
    name: users[1].name,
    email: users[1].email,
    password: users[1].password,
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
