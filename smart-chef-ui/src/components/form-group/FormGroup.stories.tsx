import { Meta, Story } from "@storybook/react";
import SCInput from "../input/Input";
import SCFormGroup, { SCFormGroupProps } from "./FormGroup";

export default {
  title: "Smartchef/Form Group",
  component: SCFormGroup,
} as Meta;

const Template: Story<SCFormGroupProps> = (args) => (
  <SCFormGroup
    {...args}
    inputId="input"
    style={{
      width: "300px",
    }}
  >
    <SCInput id="input"></SCInput>
  </SCFormGroup>
);

export const Vertical = Template.bind({});
Vertical.args = {
  horizontal: true,
  label: "Label",
};

export const Required = Template.bind({});
Required.args = {
  label: "Label",
  required: true,
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  label: "Label",
  horizontal: true,
};
