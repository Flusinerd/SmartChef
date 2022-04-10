import React from "react";
import SCNavbar from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Smartchef/Navbar",
  component: SCNavbar,
} as Meta;

const Template: Story = () => (
  <Router>
    <SCNavbar />
  </Router>
);

export const Default = Template.bind({});
