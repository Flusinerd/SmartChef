import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";
import SCTabbar from "./Tabbar";

export default {
  title: "Smartchef/Tabbar",
  component: SCTabbar,
} as Meta;

const Template: Story = () => (
  <Router>
    <SCTabbar />
  </Router>
);

export const Default = Template.bind({});
