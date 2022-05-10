import React from "react";
import SCModal, { SCModalProps } from "./Modal";
import { BrowserRouter as Router } from "react-router-dom";
import { Story, Meta } from "@storybook/react";

export default {
  title: "Smartchef/Modal",
  component: SCModal,
  argTypes: {
    hideOverlay: {
      control: {
        type: "func",
        defaultValue: () => {
          console.log("Hiding overlay");
        },
      },
    },
  },
} as Meta;

const Template: Story<SCModalProps> = (args) => {
  return (
    <Router>
      <SCModal {...args} />
    </Router>
  );
};

export const Default = Template.bind({});
Default.args = {
  modaltitle: "Modal title",
  buttons: <button>Button</button>,
  children: <div>Modal content</div>,
};
