import { mount } from "@cypress/react";
import SCButton from "./button";

describe("SCButton", () => {
  it("renders the provided content", () => {
    mount(<SCButton>Hello World</SCButton>);
    cy.get("button").contains("Hello World");
  });

  it("should be disabled if disabled is passed", () => {
    mount(<SCButton disabled>Hello World</SCButton>);
    cy.get("button").should("be.disabled");
  });

  it("should not be disabled if disabled is not passed", () => {
    mount(<SCButton>Hello World</SCButton>);
    cy.get("button").should("not.be.disabled");
  });
});
