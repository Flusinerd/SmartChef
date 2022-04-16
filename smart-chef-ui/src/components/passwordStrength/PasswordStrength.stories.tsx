import { Meta, Story } from "@storybook/react";
import SCPasswordStrength, {
  SCPasswordStrengthProps,
} from "./PasswordStrength";

export default {
  title: "Smartchef/Password Strength",
  component: SCPasswordStrength,
} as Meta;

const Template: Story<SCPasswordStrengthProps> = (args) => (
  <SCPasswordStrength {...args} />
);

export const Empty = Template.bind({});

export const Weak = Template.bind({});
Weak.args = {
  password: "weakpassword",
};

export const Medium = Template.bind({});
Medium.args = {
  password: "Mediumpassword1",
};

export const Strong = Template.bind({});
Strong.args = {
  password: "StrongPassword1$",
};

export const TooShort = Template.bind({});
TooShort.args = {
  password: "short",
};
