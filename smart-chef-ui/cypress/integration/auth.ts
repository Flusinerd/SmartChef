import { AuthService } from "../../src/authentication";

describe("Unit test for AuthService", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should be a singleton", () => {
    const authService1 = AuthService.getInstance();
    const authService2 = AuthService.getInstance();
    expect(authService1).to.equal(authService2);
  });

  it("Should allow to login", () => {
    // Setup mock
    cy.intercept("POST", "/api/auth/login", {
      statusCode: 201,
      body: {
        accessToken: "accessToken",
        refreshToken: "refreshToken",
      },
    }).as("login");
    // Execute
    const authService = AuthService.getInstance();
    authService.login("email", "password");
    // Wait for the interceept to be called
    cy.wait("@login").then(() => {
      // Verify logged in is set
      expect(authService["isLoggedIn"]).to.be.true;
      // Verify tokens are set
      expect(authService["accessToken"]).to.equal("accessToken");
      expect(authService["refreshToken"]).to.equal("refreshToken");
      // Verify refresh token is saved in local storage
      expect(
        localStorage.getItem(authService["REFRESH_TOKEN_LS_KEY"])
      ).to.equal("refreshToken");
    });
  });
});
