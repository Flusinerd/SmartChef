import { Meta, Story } from "@storybook/react";
import SCFab, { SCFabProps } from "./Fab";

export default {
  title: "Smartchef/FAB",
  component: SCFab,
} as Meta;

const Template: Story<SCFabProps> = (args) => (
  <SCFab {...args}></SCFab>
);

export const Default = Template.bind({});
Default.args = {
  onClick: () => {
    console.log("clicked");
  }
};
