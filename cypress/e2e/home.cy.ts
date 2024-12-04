describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the welcome message", () => {
    cy.contains("h1", "Welcome to Flight Management").should("be.visible");
  });

  it("displays navigation buttons", () => {
    cy.contains("button", "Login / Register").should("be.visible");
    cy.contains("button", "Manage Flights").should("be.visible");
  });

  it("navigates to Login/Register page", () => {
    cy.contains("button", "Login / Register").click();
    cy.url().should("include", "/auth");
  });

//   it("navigates to Manage Flights page", () => {
//     cy.contains("button", "Manage Flights").click();
//     cy.url().should("include", "/flights");
//   });
});
