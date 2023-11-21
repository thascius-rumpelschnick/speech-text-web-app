import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppContextProvider } from "../../hooks/AppContext";
import App from "./App";

const meta = {
    title: "Web-App/Page/IndexPage",
    component: App,
    decorators: [
        (Story, context) => (
            <div style={{ minHeight: "500px" }}>
                <AppContextProvider context={context.args}>
                    <Story />
                </AppContextProvider>
            </div>
        ),
    ],
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fullscreen",
        backgrounds: {
            default: "darkish",
            values: [{ name: "darkish", value: "rgb(33, 37, 41)" }],
        },
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedInUser: Story = {
    args: {
        user: { id: 1, name: "Foo" },
        model: { title: "Hello World" },
    },
};

export const NotLoggedInUser: Story = {
    args: {
        user: null,
        model: { title: "Hello World" },
    },
};
