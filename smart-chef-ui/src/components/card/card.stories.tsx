import { Meta, Story } from "@storybook/react";
import SCCard, { SCCardProps } from "./Card";

export default {
  title: "Smartchef/Card",
  component: SCCard,
} as Meta;

const Template: Story<SCCardProps> = (args) => (
  <SCCard {...args}> {args.children} </SCCard>
);

export const Default = Template.bind({});
Default.args = {
  title: "Title",
  children: <p>Hello World</p>,
};

export const Colored = Template.bind({});
Colored.args = {
  title: "Title",
  children: <p>Hello World</p>,
  backgroundColor: "#333",
  fontColor: "#fff",
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  title: "Title",
  children: <p>Hello World</p>,
  header: <h2>Header</h2>,
};
