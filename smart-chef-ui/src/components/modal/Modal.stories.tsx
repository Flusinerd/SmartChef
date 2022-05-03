import React from "react";
import SCModal from "./Modal";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Smartchef/Modal",
  component: SCModal,
} as Meta;

const Template: Story = () => (
  <Router>
    <SCModal isShown={true} children={<div>Hallo</div>} hideOverlay={() => {}}/>
  </Router>
);

export const Default = Template.bind({});
