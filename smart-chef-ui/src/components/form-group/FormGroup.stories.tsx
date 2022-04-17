import { Meta, Story } from "@storybook/react";
import SCFormGroup, { SCFormGroupProps } from "./FormGroup";

export default {
  title: "Smartchef/Form Group",
  component: SCFormGroup,
} as Meta;

const Template: Story<SCFormGroupProps> = (args) => <SCFormGroup {...args} />;

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

export const WithError = Template.bind({});
WithError.args = {
  label: "Label",
  error: "Error",
};
