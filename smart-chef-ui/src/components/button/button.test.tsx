import React from "react";
import { mount } from "@cypress/react";
import { SCButton } from "./button";

it("renders the button with the provided content", () => {
  mount(<SCButton>Hello World</SCButton>);
  cy.get("[data-cy=SCButton]").should("contain", "Hello World");
});

it('should be disabled when the "disabled" prop is set', () => {
  mount(<SCButton disabled>Hello World</SCButton>);
  cy.get("[data-cy=SCButton]").should("be.disabled");
});

it('should not be disabled when the "disabled" prop is not set', () => {
  mount(<SCButton>Hello World</SCButton>);
  cy.get("[data-cy=SCButton]").should("not.be.disabled");
});
