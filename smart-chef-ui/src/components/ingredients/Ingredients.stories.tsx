import React from "react";
import SCIngredients, { SCIngredientsProps } from "./Ingredients";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Smartchef/Ingredients",
  component: SCIngredients,
} as Meta;

const Template: Story<SCIngredientsProps> = (args) => (
  <Router>
    <SCIngredients {...args} />
  </Router>
);

export const Default = Template.bind({});

Default.args = {
  items: [{ id: 1, title: "Tomatensaft", quantity: "3" }],
  openOverlay: () => {},
};
