import users, { TestUser } from "../../data/userData";

describe("Recording User Experience", () => {
  it("User Journey: no logged Home Page", () => {
    cy.visit("/");

    // Hero Container
    cy.contains("Shop Now").focus().wait(500).click();
    cy.wait(1000);

    // footer
    cy.scrollTo("bottom", { duration: 1000 });
    cy.wait(1000);

    // Carousel
    cy.get('[data-testid="CarouselContainer"]').scrollIntoView({
      duration: 1000,
    });

    // wait for Carousel auto slide change.
    // cy.wait(4000);

    // click next and prev button for slide changes
    cy.get('button[aria-label="Next Slide"]').click();
    cy.wait(1000);
    cy.get('button[aria-label="Previous Slide"]').click();

    // Click "Show More" inside the new active slide
    cy.get("a").contains("Show More").click({ force: true });
    cy.wait(1000);

    // need to add single product review and redirect to auth
  });

  it.skip("User journey: Auth to Home Page", () => {
    cy.visit("/auth");

    cy.get('[data-testid="login"]').click();
    cy.scrollTo(0, 200, { duration: 1000 });
    cy.applyCommandDelay(1000);

    // Not found email
    cy.findByLabelText("Email").type("wrongEmail", { force: true });
    cy.findByLabelText("Password").type("123", { force: true });
    cy.get("form").submit();

    // // Register New User
    cy.get('[data-testid="register"]').click();
    cy.scrollTo(0, 200, { duration: 1000 });
    cy.applyCommandDelay(500);

    // // Invalid Input show errors
    cy.findByLabelText("Username").type("12", { force: true });
    cy.findByLabelText("Email").type("invalid@gam", { force: true });
    cy.findByLabelText("Password").type("1234", { force: true });
    cy.findByLabelText("Confirm password").type("12345", { force: true });
    cy.get("form").submit();

    cy.visit("/auth/register");
    cy.scrollTo(0, 200, { duration: 1000 });
    // Valid User but it's already exists
    cy.findByLabelText("Username").type(users[1].name, { force: true });
    cy.findByLabelText("Email").type(users[1].email, { force: true });
    cy.findByLabelText("Password").type(users[1].password, { force: true });
    cy.findByLabelText("Confirm password").type(users[1].password, {
      force: true,
    });
    cy.get("form").submit();

    // valid User that does not exist
    cy.findByLabelText("Username").type(TestUser.name, { force: true });
    cy.findByLabelText("Email").type(TestUser.email, { force: true });
    cy.findByLabelText("Password").type(TestUser.password, { force: true });
    cy.findByLabelText("Confirm password").type(TestUser.password, {
      force: true,
    });
    cy.get("form").submit();
    cy.get(".Dropdown-btn").click({ force: true });
    //click on logout
    cy.get(".dropdown-content").contains("Logout").click({ force: true });

    cy.get('[data-testid="login"]').click();
    cy.scrollTo(0, 200, { duration: 1000 });
    cy.applyCommandDelay(1000);

    // Login With correct User.
    cy.findByLabelText("Email").type(TestUser.email, { force: true });
    cy.findByLabelText("Password").type(TestUser.password, { force: true });
    cy.get('input[type="submit"][value="login"]')
      .should("be.visible")
      .trigger("focus");
    cy.get("form").submit();

    cy.wait(500);
  });
});
