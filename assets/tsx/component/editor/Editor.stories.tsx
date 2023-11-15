import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AppContextProvider } from "../../hook/AppContext";
import Editor from "./Editor";

const meta = {
    title: "Web-App/Component/Editor",
    component: Editor,
    decorators: [
        (Story, context) => (
            <div style={ { minHeight: "500px" } }>
                <AppContextProvider context={ context.args }>
                    <Story/>
                </AppContextProvider>
            </div>
        ),
    ],
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fullscreen",
        backgrounds: {
            default: "darkish",
            values: [
                { name: "darkish", value: "rgb(33, 37, 41)" },
            ],
        },
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: [ "autodocs" ],
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextEditor: Story = {
    args: {
        user: { id: 1, name: "Foo" },
        model: { title: "Hello World" },
    },
};
