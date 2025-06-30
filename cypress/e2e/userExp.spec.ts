import users, { TestUser } from "../../data/userData";
import "cypress-real-events/support";

describe("Recording User Experience", () => {
  it.skip("User Journey: no logged Home Page", () => {
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
    cy.wait(4000);

    // click next and prev button for slide changes
    cy.get('button[aria-label="Next Slide"]').click();
    cy.wait(1000);
    cy.get('button[aria-label="Previous Slide"]').click();

    // Click "Show More" inside the new active slide
    cy.get("a").contains("Show More").click({ force: true });
    cy.wait(500);

    // Single Product Page

    // image hover
    cy.get("[data-cy=image-magnifier]")
      .find("img")
      .scrollIntoView()
      .realHover()
      .then(($img) => {
        const width = $img[0].clientWidth;
        const height = $img[0].clientHeight;
        const step = 20;
        const maxSteps = Math.min(width, height) / step;

        for (let i = 0; i <= maxSteps; i++) {
          const x = i * step;
          const y = i * step;
          cy.wrap($img).realMouseMove(x, y);
        }

        // 🔷 Bottom-right to bottom-left (horizontal)
        for (let x = width; x >= 0; x -= step) {
          cy.wrap($img).realMouseMove(x, height);
        }

        // 🔷 Bottom-left to top-right (diagonal up)
        for (let i = 0; i <= maxSteps; i++) {
          const x = i * step;
          const y = height - i * step;
          cy.wrap($img).realMouseMove(x, y);
        }

        cy.get("body").realHover();
      });

    //  footer
    cy.scrollTo("bottom", { duration: 1000 });
    cy.wait(1000);

    // qty
    cy.get("#Quantity").select("2");

    // redirect to auth
    cy.contains("Login/Register").click();
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
    // cy.findByLabelText("Username").type(TestUser.name, { force: true });
    // cy.findByLabelText("Email").type(TestUser.email, { force: true });
    // cy.findByLabelText("Password").type(TestUser.password, { force: true });
    // cy.findByLabelText("Confirm password").type(TestUser.password, {
    //   force: true,
    // });
    // cy.get("form").submit();
    // cy.get(".Dropdown-btn").click({ force: true });
    // //click on logout
    // cy.get(".dropdown-content").contains("Logout").click({ force: true });

    // temp
    cy.visit("/auth/login?redirectTo=/product/60d5e622e5179e2bb44bd83b?qty=3");
    // cy.get('[data-testid="login"]').click();
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

    // add to cart
    cy.contains("TO CART").click();
    cy.wait(500);
  });
  it.skip("User Journey:Check out", () => {
    cy.loginByApi(TestUser.email, TestUser.password);
    cy.visit("/cart");

    cy.get("button").contains("Checkout").click();

    // address Page

    // invalid input
    cy.get('input[name="address"]').type("123 Test Street", { force: true });
    cy.get('input[name="city"]').type("T", { force: true });
    cy.get('input[name="postalcode"]').type("123", { force: true });

    cy.get('input[type="submit"]').click();

    // valid input
    cy.get('input[name="address"]')
      .clear()
      .type("123 Test Street", { force: true });
    cy.get('input[name="city"]').clear().type("Testville", { force: true });
    cy.get('input[name="postalcode"]').clear().type("123456", { force: true });
    cy.get('input[type="submit"]').click();

    cy.wait(1000);
    // payment method Page

    // click on address to recheck
    cy.contains("a", "Address").click();
    cy.get('input[name="postalcode"]').clear().type("567891", { force: true });
    cy.wait(1000);
    // go to payment again
    cy.get('input[type="submit"]').click();

    cy.get('[data-testid="CashButton"]').check({ force: true });
    cy.wait(1000);
    cy.get('[data-testid="PayPalButton"]').check({ force: true });

    // go to Place order page
    cy.get('input[type="submit"]').click();

    cy.scrollTo(0, 200, { duration: 1000 });

    // go to PayPal Page
    cy.get('input[type="submit"]').click();

    cy.wait(4000);

    cy.visit("/OrderStatus");
  });

  it("User Journey: Order and Reviews", () => {
    cy.loginByApi(TestUser.email, TestUser.password);
    cy.visit("/OrderStatus");
    // need to populate data
  });
});
