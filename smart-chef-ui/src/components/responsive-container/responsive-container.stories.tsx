import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";
import SCResponsiveContainer from "./responsive-container";

export default {
  title: "Smartchef/Responsive Container",
  component: SCResponsiveContainer,
} as Meta;

const Template: Story = () => (
  <Router>
    <SCResponsiveContainer />
  </Router>
);

export const Default = Template.bind({});
