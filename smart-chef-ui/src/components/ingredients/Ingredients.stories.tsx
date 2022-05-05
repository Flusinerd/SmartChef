import React from "react";
import SCIngredients from "./Ingredients";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Smartchef/Ingredients",
  component: SCIngredients,
} as Meta;

const Template: Story = () => (
  <Router>
    <SCIngredients />
  </Router>
);

export const Default = Template.bind({});
