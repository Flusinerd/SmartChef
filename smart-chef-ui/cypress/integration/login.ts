describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Should have a link to forgot-password", () => {
    cy.get('a[href="/forgot-password"]').should("exist");
  });

  it("Should have a link to register", () => {
    cy.get('a[href="/register"]').should("exist");
  });

  it("Should have a login form with email and password input", () => {
    cy.get("form").should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
  });

  it("Should have a login button", () => {
    cy.get('button[type="submit"]').should("exist");
  });

  it("Should validate the email input against pattern", () => {
    cy.get('input[name="email"]').type("invalid email");
    // Verify the error is displayed
    cy.get('span[data-cy="email-invalid-error"]').should("exist");
    // Verify the button is disabled
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Should make sure the email input is not empty", () => {
    cy.get('input[name="email"]').clear();
    // Focus and blur to trigger the error
    cy.get('input[name="email"]').focus();
    cy.get('input[name="email"]').blur();
    // Verify the error is displayed
    cy.get('span[data-cy="email-required-error"]').should("exist");
    // Verify the button is disabled
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Should make sure the password input is not empty", () => {
    cy.get('input[name="password"]').clear();
    // Focus and blur to trigger the error
    cy.get('input[name="password"]').focus();
    cy.get('input[name="password"]').blur();
    // Verify the error is displayed
    cy.get('span[data-cy="password-required-error"]').should("exist");
    // Verify the button is disabled
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("Should make sure the password has at least 8 characters", () => {
    cy.get('input[name="password"]').type("1234567");
    // Verify the error is displayed
    cy.get('span[data-cy="password-invalid-error"]').should("exist");
    // Verify the button is disabled
    cy.get('button[type="submit"]').should("be.disabled");
  });
});
