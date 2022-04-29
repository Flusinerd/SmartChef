import React from "react";
import SCBreadcrumb from "./Breadcrumb";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";


export default {
  title: "Smartchef/Breadcrumb",
  component: SCBreadcrumb,
} as Meta;


  

const Template: Story = () => (
  <Router>
    <SCBreadcrumb />
  </Router>
);

export const Default = Template.bind({});