import { mount } from "@cypress/react";
import SCAccordion from "./Accordion";

describe("Accordion", () => {
  it("should render", () => {
    mount(
      <SCAccordion title="Title">
        <span>Content</span>
      </SCAccordion>
    );
  });

  it("should render the title", () => {
    mount(
      <SCAccordion title="Title">
        <span>Content</span>
      </SCAccordion>
    );
    cy.get("[data-cy=accordion-title]").should("contain", "Title");
  });

    it("should render the content when open", () => {
    mount(
        <SCAccordion title="Title">
            <span>Content</span>
        </SCAccordion>
    );
    cy.get("[data-cy=accordion-click]").click().then(() => {
        cy.get("[data-cy=accordion-content]").should("contain", "Content");
    })
});
});
