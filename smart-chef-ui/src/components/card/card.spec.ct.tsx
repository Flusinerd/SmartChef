import { mount } from "@cypress/react";
import SCCard from "./Card";

const child = <p>Hello World</p>;

describe("SCCard", () => {
  it("Should render", () => {
    mount(<SCCard title="Title"> {child} </SCCard>);
  });

  it("Should render with backgroundColor", () => {
    mount(
      <SCCard title="Title" backgroundColor="#333">
        {" "}
        {child}{" "}
      </SCCard>
    );
    cy.get(".sc-card").should(
      "have.css",
      "background-color",
      "rgb(51, 51, 51)"
    );
  });

  it("Should render with fontColor", () => {
    mount(
      <SCCard title="Title" fontColor="#fff">
        {" "}
        {child}{" "}
      </SCCard>
    );
    cy.get(".sc-card").should("have.css", "color", "rgb(255, 255, 255)");
  });

  it("Should render the title if no header is provided", () => {
    mount(<SCCard title="Title"> {child} </SCCard>);
    cy.get(".sc-card-title").should("have.text", "Title");
  });

  it("Should render the header if provided", () => {
    mount(
      <SCCard title="Title" header={<h2>Header</h2>}>
        {" "}
        {child}{" "}
      </SCCard>
    );
    cy.get(".sc-card-header").should("have.text", "Header");
    // Should not render the title
    cy.get(".sc-card-title").should("not.exist");
  });

  it("Should render the children", () => {
    mount(<SCCard title="Title">{child}</SCCard>);
    // Check if the child element is inserted into the DOM
    cy.get(".sc-card-body").should("contain", "Hello World");
  });
});
