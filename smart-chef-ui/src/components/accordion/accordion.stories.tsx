import React from "react";
import SCAccordion from "./Accordion";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Smartchef/Accordion",
  component: SCAccordion,
} as Meta;

const Template: Story = () => (
  <Router>
    <SCAccordion />
  </Router>
);

export const Default = Template.bind({});
