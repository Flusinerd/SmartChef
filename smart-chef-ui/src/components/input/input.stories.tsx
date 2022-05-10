import { Meta, Story } from "@storybook/react";
import SCInput, { SCInputProps } from "./Input";

export default {
  title: "Smartchef/Input",
  component: SCInput,
} as Meta;

const onChangeListener = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

const Template: Story<SCInputProps> = (args) => <SCInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Enter a value",
};

export const WithValue = Template.bind({});
WithValue.args = {
  placeholder: "Enter a value",
  value: "Hello World",
  onChange: onChangeListener,
};

export const WithError = Template.bind({});
WithError.args = {
  placeholder: "Enter a value",
  value: "Hello World",
  error: "Error",
  onChange: onChangeListener,
};
