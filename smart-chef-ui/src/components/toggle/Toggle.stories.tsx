import React from "react";
import SCToggle from "./Toggle";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Smartchef/Toggle",
  component: SCToggle,
} as Meta;

const Template: Story = () => (
  <Router>
    <SCToggle >
      Einbuchen / Ausbuchen
    </SCToggle>
  </Router>
);

export const Default = Template.bind({});