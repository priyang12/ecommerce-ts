beforeEach(function () {
  cy.visit("/Auth");
});
it("Login/Register Page Should Load", function () {
  cy.contains("Login");
  cy.contains("Register");
});
it("Input Invalid Email and Invalid Password", () => {
  cy.get('input[name="email"]').type("asdhsad");
  cy.get('input[name="password"]').type("123");
  // submit form
  cy.get("form").submit(); // <-- add this
  //Check for Invalid Email
  cy.contains(/Email is not Valid/);
  cy.contains(/6 Characters/);
  //Check for Empty Password
});
it("Input Valid Email and Wrong Password", () => {
  cy.get('input[name="email"]').type("patelpriyang95@gmail.com");
  cy.get('input[name="password"]').type("1234567");
  // submit form
  cy.get("form").submit(); // <-- add this

  //check for Invalid Password
  cy.contains(/Invalid/);
  //enter correct password
  cy.get('input[name="email"]').type("patelpriyang95@gmail.com");
  cy.get('input[name="password"]').type("123123");

  cy.get("form").submit(); // <-- add this
  //check for login success
  cy.url().should("eq", "http://localhost:3000/");

  //check for User Name
  cy.contains("Priyang");
});
