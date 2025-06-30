describe("Home Page /", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Clicks 'Shop Now' and scrolls to #Products", () => {
    cy.contains("Shop Now").click();

    // Check that we scrolled to the #Products section
    cy.url().should("include", "#Products");
    cy.get("#Products").should("exist").and("be.visible");
  });

  it("Carousel next/prev buttons change center slide's data-active", () => {
    // Get the initial active slide
    cy.get('[data-active="true"]').then(($initialSlide) => {
      // Click the "Next Slide" button
      cy.get('button[aria-label="Next Slide"]').click();
      cy.wait(1000); // optional: depends on transition duration

      // Get the new active slide
      cy.get('[data-active="true"]').should(($newSlide) => {
        expect($newSlide.get(0)).not.to.eq($initialSlide.get(0));
      });

      // Click "Show More" inside the new active slide
      cy.get('[data-active="true"] a').contains("Show More").click();

      // Assert URL changes to product page
      cy.url().should("match", /\/product\/[a-zA-Z0-9]+/);
    });
  });

  it("#Products section contains product items", () => {
    cy.get("#Products")
      .find(`[role="article"]`) // Adjust to your product item class/selector
      .should("have.length.greaterThan", 0);
  });

  it("Searching 'iphone' updates the URL", () => {
    cy.get('input[aria-label="Search Product"]').type("iphone{enter}");

    cy.url().should("eq", `${Cypress.config("baseUrl")}/search/iphone`);

    cy.get('[role="article"]').contains("iPhone").should("exist");
  });

  it("Pagination buttons on search page update URL correctly", () => {
    // Start with /search/shoes
    cy.visit(`${Cypress.config("baseUrl")}/search/shoes`);

    // Ensure Next buttons exist
    cy.get("button").filter(":contains('Next')").should("have.length", 2);

    // Click one of them
    cy.get("button").contains("Next").first().click();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/search/shoes/2`);

    // Check for Previous button
    // Back to page 1
    cy.get("button").contains("Previous").should("exist").click();
    cy.url().should("eq", `${Cypress.config("baseUrl")}/search/shoes/1`);
  });
});
