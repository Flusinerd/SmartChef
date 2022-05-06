import React from "react";
import SCBreadcrumb from "./Breadcrumb";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";


export default {
  title: "Smartchef/Breadcrumb",
  component: SCBreadcrumb,
} as Meta;

const breadcrumb = [
  {url:'/', name:"Home"},
  {url:'/scan', name:"Scannen"}, 
  {url:'/settings', name:"Einstellungen"}];

  

const Template: Story = () => (
  <Router>
    <SCBreadcrumb breadcrumbItems={breadcrumb} />
  </Router>
);

export const Default = Template.bind({});