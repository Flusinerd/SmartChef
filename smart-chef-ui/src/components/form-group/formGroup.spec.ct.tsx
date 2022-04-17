import { mount } from "@cypress/react";
import SCFormGroup from "./FormGroup";

const labelText = "Label";
const errorText = "Error";

describe("FormGroup", () => {
  it("should render", () => {
    mount(<SCFormGroup label={labelText}></SCFormGroup>);

    // Should have one input and one label
    cy.get("input").should("have.length", 1);
    cy.get("label").should("have.length", 1);
  });

  it("should render with error", () => {
    mount(<SCFormGroup label={labelText} error={errorText}></SCFormGroup>);

    // Should have one input and one label
    cy.get("input").should("have.length", 1);
    cy.get("label").should("have.length", 1);

    // Should pass the error prop to the input
    cy.get("input").should("have.attr", "error", errorText);
  });

  it("should render with horizontal layout", () => {
    mount(<SCFormGroup label={labelText} horizontal></SCFormGroup>);

    // Should have one input and one label
    cy.get("input").should("have.length", 1);
    cy.get("label").should("have.length", 1);

    // Should have horizontal class
    cy.get("div").should("have.class", "sc-form-group-horizontal");
  });

  it("should render with required", () => {
    mount(<SCFormGroup label={labelText} required></SCFormGroup>);

    // Should have one input and one label
    cy.get("input").should("have.length", 1);
    cy.get("label").should("have.length", 1);

    // Should have required class
    cy.get("label").should("have.class", "required");
  });
});
