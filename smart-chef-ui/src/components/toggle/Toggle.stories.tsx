import React from "react";
import SCToggle, { SCToggleProps } from "./Toggle";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";
import { useForm } from "react-hook-form";

export default {
  title: "Smartchef/Toggle",
  component: SCToggle,
} as Meta;

const Template: Story<SCToggleProps> = (args) => (
  <Router>
    <SCToggle {...args}></SCToggle>
  </Router>
);

const withReactHookForm = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { register, watch } = useForm();
  console.log(watch("checkbox"));
  return (
    <Router>
      <SCToggle
        activeLabel="Active"
        inactiveLabel="Inactive"
        register={register("checkbox")}
      ></SCToggle>
    </Router>
  );
};

export const WithHookForm = withReactHookForm.bind({});

export const Default = Template.bind({});
Default.args = {
  activeLabel: "Aktiv",
  inactiveLabel: "Inaktiv",
};
