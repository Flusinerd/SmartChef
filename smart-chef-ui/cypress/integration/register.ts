const mockUserData = {
  email: "test@test.org",
  password: "aA123456",
  firstName: "Test",
  lastName: "User",
};

describe("Register page", () => {
  beforeEach(() => {
    cy.visit("/register");
  });

  it("Should allow user to register if all inputs are valid", () => {
    // Intercept the POST request to /api/users/
    cy.intercept("POST", "/api/users/", {}).as("register");

    fillForm();
    cy.get('button[type="submit"]').click();

    // Verify the POST request was made
    cy.wait("@register").then((xhr) => {
      // Check the request body
      expect(xhr.request.body).to.deep.equal(mockUserData);
    });

    // Verify the user is redirected to the login page
    cy.url().should("include", "/login");
  });

  it("Should not allow user to register if email is already taken", () => {
    // Intercept the POST request to /api/users/
    cy.intercept("POST", "/api/users/", {
      statusCode: 409,
      response: {
        message: "Email already taken",
      },
    }).as("register");

    fillForm();
    cy.get('button[type="submit"]').click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("E-Mail Adresse ist bereits vergeben");
    });

    // Verify the POST request was made
    cy.wait("@register").then((xhr) => {
      // Check the request body
      expect(xhr.request.body).to.deep.equal(mockUserData);
    });
  });

  it("Should not allow user to register if password confirmation does not match", () => {
    fillForm();
    cy.get('input[name="passwordConfirm"]').type("otherPassword");

    // The button should be disabled
    cy.get('button[type="submit"]').should("be.disabled");

    // The error message should be visible
    cy.get("[data-cy='password-mismatch-error']").should("be.visible");
  });

  it("Should not allow user to register if password is too short", () => {
    cy.get('input[name="password"]').clear().type("aA1");
    cy.get('input[name="passwordConfirm"]').clear().type("aA1");

    // The button should be disabled
    cy.get('button[type="submit"]').should("be.disabled");

    // The error message should be visible
    cy.get("[data-cy='password-length-error']").should("be.visible");
  });

  it("Should not allow user to register if first name is missing", () => {
    cy.get('input[name="firstName"]').focus().blur();

    // The button should be disabled
    cy.get('button[type="submit"]').should("be.disabled");

    // The error message should be visible
    cy.get("[data-cy='first-name-required-error']").should("be.visible");
  });

  it("Should not allow user to register if last name is missing", () => {
    cy.get('input[name="lastName"]').focus().blur();

    // The button should be disabled
    cy.get('button[type="submit"]').should("be.disabled");

    // The error message should be visible
    cy.get("[data-cy='last-name-required-error']").should("be.visible");
  });

  it("Should not allow user to register if email is missing", () => {
    cy.get('input[name="email"]').focus().blur();

    // The button should be disabled
    cy.get('button[type="submit"]').should("be.disabled");

    // The error message should be visible
    cy.get("[data-cy='email-required-error']").should("be.visible");
  });

  it("Should not allow user to register if password is missing", () => {
    cy.get('input[name="password"]').focus().blur();

    // The button should be disabled
    cy.get('button[type="submit"]').should("be.disabled");

    // The error message should be visible
    cy.get("[data-cy='password-required-error']").should("be.visible");
  });

  it("Should not allow user to register if password confirmation is missing", () => {
    cy.get('input[name="passwordConfirm"]').focus().blur();

    // The button should be disabled
    cy.get('button[type="submit"]').should("be.disabled");

    // The error message should be visible
    cy.get("[data-cy='password-confirm-required-error']").should("be.visible");
  });

  it("Should not allow user to register if email is invalid", () => {
    cy.get('input[name="email"]').clear().type("invalid");

    // The button should be disabled
    cy.get('button[type="submit"]').should("be.disabled");

    // The error message should be visible
    cy.get("[data-cy='email-pattern-error']").should("be.visible");
  });
});

function fillForm() {
  cy.get('input[name="firstName"]').type(mockUserData.firstName);
  cy.get('input[name="lastName"]').type(mockUserData.lastName);
  cy.get('input[name="email"]').type(mockUserData.email);
  cy.get('input[name="password"]').type(mockUserData.password);
  cy.get('input[name="passwordConfirm"]').type(mockUserData.password);
}
