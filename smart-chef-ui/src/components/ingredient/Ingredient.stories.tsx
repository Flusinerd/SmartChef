import React from "react";
import SCIngredient from "./Ingredient";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Smartchef/Ingredient",
  component: SCIngredient,
} as Meta;

const Template: Story = () => (
  <Router>
    <SCIngredient id = {1} title = "Tomatensaft" quantity = "1 L"/>
  </Router>
);

export const Default = Template.bind({});