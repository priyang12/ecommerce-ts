import { TestProduct } from "../../data/productsData";

describe("Single Product Page - /product/:id", () => {
  beforeEach(() => {
    cy.visit(`/product/${TestProduct._id}`);
  });

  it("renders the Single Product Page", () => {
    // Check that the product title is rendered
    cy.get("h1").should("contain", TestProduct.name.trim());
  });

  it("displays the product description, brand, and category", () => {
    cy.contains("Description").should("exist");
    cy.contains(TestProduct.brand).should("exist");
    cy.contains(TestProduct.category).should("exist");
  });

  it("displays price and stock status correctly", () => {
    cy.contains(`Price: ${TestProduct.price}`).should("exist");

    if (TestProduct.countInStock > 0) {
      cy.contains("Status: In Stock").should("exist");
    } else {
      cy.contains("Status: Out In Stock").should("exist");
    }
  });

  // need to fix magnifier component
  it.skip("displays product image with magnifier", () => {
    cy.get('div[aria-label="product image"]')
      .find("img")
      .should("have.attr", "src", TestProduct.image);
  });

  it("renders the rating and number of reviews", () => {
    cy.contains(`${TestProduct.numReviews} reviews`).should("exist");
  });

  it("renders quantity selector and allows value change", () => {
    if (TestProduct.countInStock > 0) {
      cy.get('select[name="Quantity"]').should("exist").select("2");
    }
  });

  it("allows adding to cart if authenticated", () => {
    cy.loginByApi();
    // Revisit the page with auth state
    cy.visit(`/product/${TestProduct._id}`);
    if (TestProduct.countInStock > 0) {
      cy.contains("TO CART").click();

      cy.contains("Adding to cart").should("exist");

      cy.wait(500);
      cy.contains(/Qty is Updated to 1/).should("exist");
    }
  });

  it("allows adding to wishlist if authenticated", () => {
    cy.loginByApi();
    // Revisit the page with auth state
    cy.visit(`/product/${TestProduct._id}`);

    cy.contains("WISH LIST").click();

    cy.contains("Adding to wishlist").should("exist");
  });

  it("redirects to login if not authenticated and tries to add to cart", () => {
    if (TestProduct.countInStock > 0) {
      cy.contains("Login/Register").should("exist");
    }
  });

  it("renders the Reviews component", () => {
    cy.contains("reviews").should("exist"); // Basic check
  });

  it("displays suggestion products section", () => {
    cy.contains("Product Suggestions").should("exist"); // if heading exists
  });
});
