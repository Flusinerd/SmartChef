import { Meta, Story } from "@storybook/react";
import SCAccordion, { SCAccordionProps } from "./Accordion";

export default {
  title: "Smartchef/Accordion",
  component: SCAccordion,
} as Meta;

const Template: Story<SCAccordionProps> = (args) => <SCAccordion {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Accordion",
  children: (
    <div>
      <div>
        <h3>Artikel 1</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          euismod, urna eu tempor congue, nisi nunc tristique nunc, eget
          consectetur nunc nisl euismod.
        </p>
      </div>
      <div>
        <h3>Artikel 2</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          euismod, urna eu tempor congue, nisi nunc tristique nunc, eget
          consectetur nunc nisl euismod.
        </p>
      </div>
    </div>
  ),
};
