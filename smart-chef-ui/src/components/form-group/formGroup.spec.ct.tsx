import { mount } from "@cypress/react";
import SCFormGroup from "./FormGroup";

const labelText = "Label";

describe("FormGroup", () => {
  it("should render", () => {
    mount(
      <SCFormGroup label={labelText} inputId="input">
        <input type="text" id="input" />
      </SCFormGroup>
    );

    // Should have one input and one label
    cy.get("input").should("have.length", 1);
    cy.get("label").should("have.length", 1);
  });

  it("should render with horizontal layout", () => {
    mount(
      <SCFormGroup label={labelText} inputId="input" horizontal>
        <input type="text" id="input" />
      </SCFormGroup>
    );

    // Should have one input and one label
    cy.get("input").should("have.length", 1);
    cy.get("label").should("have.length", 1);

    // Should have horizontal class
    cy.get("div").should("have.class", "sc-form-group-horizontal");
  });

  it("should render with required", () => {
    mount(
      <SCFormGroup label={labelText} inputId="input" required>
        <input type="text" id="input" />
      </SCFormGroup>
    );

    // Should have one input and one label
    cy.get("input").should("have.length", 1);
    cy.get("label").should("have.length", 1);

    // Should have required class
    cy.get("label").should("have.class", "required");
  });
});
