import { mount } from "@cypress/react";
import SCSelect from "./Select";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

describe("Select", () => {
  it("should render", () => {
    mount(<SCSelect />);
  });

  it("should render the provided options", () => {
    const wrapper = mount(<SCSelect options={options} />);
    wrapper.get("select").find("option").should("have.length", 3);
  });

  it("should render the provided placeholder", () => {
    const placeholder = "Select an option";
    const wrapper = mount(<SCSelect placeholder={placeholder} />);
    wrapper.get("select").find("option").should("have.length", 1);
    wrapper.get("select").find("option").should("have.text", placeholder);
  });

  it("should render the provided value", () => {
    const value = options[1].value;
    const label = options[1].label;
    const wrapper = mount(<SCSelect value={value} options={options} />);

    // Check the value is set
    wrapper.get("select").should("have.value", value);

    // Check the label is set on the option
    wrapper.get("select").find("option").contains(label).should("be.visible");
  });

  it("should be disabled", () => {
    const wrapper = mount(<SCSelect disabled />);
    wrapper.get("select").should("be.disabled");
  });

  it("should call the onChange callback", () => {
    const stub = cy.stub();

    const wrapper = mount(<SCSelect options={options} onChange={stub} />);
    wrapper
      .get("select")
      .select(options[1].label)
      .then(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        expect(stub).to.have.been.called;
      });
  });

  it("should throw an error if the value is not in the options", () => {
    const value = "invalid";
    const wrapper = mount(<SCSelect value={value} options={options} />);
    // Check the value is is not changed
    wrapper.get("select").should("have.value", options[0].value);
  });
});
