import React from "react";
import SCBreadcrumb from "./Breadcrumb";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";
import  {ReactComponent as HomeIcon} from "./home-icon.svg"


export default {
  title: "Smartchef/Breadcrumb",
  component: SCBreadcrumb,
} as Meta;

const breadcrumb = [
  {url:'/', name: <HomeIcon />},
  {url:'/menue', name:"Menüart"}, 
  {url:'/maindish', name:"Hauptspeise"}
  ];

  

const Template: Story = () => (
  <Router>
    <SCBreadcrumb breadcrumbItems={breadcrumb} />
  </Router>
);

export const Default = Template.bind({});