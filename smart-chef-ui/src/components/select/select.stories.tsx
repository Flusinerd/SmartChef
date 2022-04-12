import { Meta, Story } from "@storybook/react";
import { ChangeEventHandler } from "react";
import SCSelect, { SelectProps } from "./Select";

export default {
  title: "Smartchef/Select",
  component: SCSelect,
} as Meta;

const Template: Story<SelectProps> = (args: SelectProps) => (
  <SCSelect {...args} />
);

const onChange: ChangeEventHandler<HTMLSelectElement> = (event) =>
  console.log(event.target.value);

const options: SelectProps["options"] = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

export const Default = Template.bind({});
Default.args = {
  placeholder: "Select a value",
  onChange,
  value: undefined,
  options,
};

export const WithValue = Template.bind({});
WithValue.args = {
  placeholder: "Select a value",
  onChange,
  value: "2",
  options,
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: "Select a value",
  onChange,
  value: undefined,
  options,
  disabled: true,
};
