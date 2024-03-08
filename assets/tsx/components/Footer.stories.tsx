import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StorybookContextProvider } from "../hooks/AppContext";
import Footer from "./Footer";

const meta = {
    title: "Web-App/Component/Footer",
    component: Footer,
    decorators: [
        (Story, context) => (
            <div style={{ minHeight: "500px" }}>
                <StorybookContextProvider storybookContext={context.args}>
                    <Story />
                </StorybookContextProvider>
            </div>
        ),
    ],
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fullscreen",
        backgrounds: {
            default: "darkish",
            values: [ { name: "darkish", value: "rgb(33, 37, 41)" } ],
        },
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: [ "autodocs" ],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StandardFooter: Story = {
    args: {
        user: { id: 1, name: "Foo" },
    },
};
