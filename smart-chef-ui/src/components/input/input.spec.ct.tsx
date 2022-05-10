/* eslint-disable @typescript-eslint/no-unused-expressions */
import { mount } from "@cypress/react";
import SCInput from "./Input";

describe("Input", () => {
  it("Should render without errors", () => {
    const component = mount(<SCInput />);
    expect(component).to.exist;
  });

  it("Should render the provided placeholder", () => {
    const placeholder = "Placeholder";
    const component = mount(<SCInput placeholder={placeholder} />);
    component.get("input").should("have.attr", "placeholder", placeholder);
  });

  it("Should render the provided value", () => {
    const onChangeListener = cy.stub();
    const value = "Value";
    const component = mount(
      <SCInput value={value} onChange={onChangeListener} />
    );
    component.get("input").should("have.value", value);
  });

  it("Should be disabled", () => {
    const component = mount(<SCInput disabled />);
    component.get("input").should("be.disabled");
  });

  it("Should call the onChange callback", () => {
    const stub = cy.stub();

    const component = mount(<SCInput onChange={stub} />);
    component
      .get("input")
      .type("Test")
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(stub).to.have.been.called;
      });
  });

  it("Should render error message", () => {
    const errorMessage = "Error message";
    const component = mount(<SCInput error={errorMessage} />);
    // Verify the text is rendered
    component.get(".sc-input-error").should("have.text", errorMessage);

    // Verify the error icon is rendered
    component.get(".sc-input-error-icon").should("be.visible");
  });

  it("Should render error with a boolean", () => {
    const component = mount(<SCInput error />);
    // Verify the icon is rendered
    component.get(".sc-input-error-icon").should("be.visible");

    // Verify the text is not rendered
    component.get("div.sc-input-error").should("not.exist");
  });
});
