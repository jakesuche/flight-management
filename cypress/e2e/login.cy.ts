describe("Authentication", () => {
  it("should allow a user to log in", () => {
    cy.visit("/auth");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.contains("Welcome, Test User!").should("be.visible");
  });

  it("should show an error message for invalid credentials", () => {
    cy.visit("/");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();
    cy.contains("Invalid credentials").should("be.visible");
  });

  it("should allow a user to register", () => {
    cy.visit("/");
    cy.contains("Don't have an account? Register").click();
    cy.get('input[name="name"]').type("New User");
    cy.get('input[name="email"]').type("newuser@example.com");
    cy.get('input[name="password"]').type("newpassword123");
    cy.get('button[type="submit"]').click();
    cy.contains("Your account has been created successfully.").should(
      "be.visible"
    );
  });
});
