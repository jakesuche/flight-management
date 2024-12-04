describe("Auth Page - Switch Between Login and Register", () => {
  beforeEach(() => {
    cy.visit("/auth");
  });

  it("switches from login to register and back to login", () => {
    cy.contains("form", "Login").should("be.visible");
    cy.contains("button", "Don't have an account? Register").should(
      "be.visible"
    );

    cy.contains("button", "Don't have an account? Register").click();

    cy.contains("form", "Register").should("be.visible");
    cy.contains("button", "Already have an account? Login").should(
      "be.visible"
    );
    cy.contains("button", "Already have an account? Login").click();

    cy.contains("form", "Login").should("be.visible");
  });
});


