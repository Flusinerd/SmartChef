import React from "react";
import SCFab from "./SCFab";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Smartchef/Fab",
  component: SCFab,
} as Meta;

const Template: Story = () => (
  <Router>
    <SCFab />
  </Router>
);

export const Default = Template.bind({});
