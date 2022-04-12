describe("Landing page", () => {
  it("should display the landing page", () => {
    cy.visit("/");
    cy.get("h1").contains("SmartChef");
  });
});
