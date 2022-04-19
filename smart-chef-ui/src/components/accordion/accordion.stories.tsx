import SCAccordion from "./Accordion";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Smartchef/Accordion",
  component: SCAccordion,
} as Meta;

const Template: Story = (args) => (
  <Router>
    <SCAccordion title="Eingekaufte Artikel">{args.children}</SCAccordion>
  </Router>
);

export const Default = Template.bind({});
