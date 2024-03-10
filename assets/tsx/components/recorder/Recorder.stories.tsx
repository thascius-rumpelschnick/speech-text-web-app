import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ApiRequestData } from "../../hooks/ApiRequest";
import { StorybookContextProvider } from "../../hooks/AppContext";
import Recorder from "./Recorder";

const meta = {
    title: "Web-App/Component/Recorder",
    component: Recorder,
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
} satisfies Meta<typeof Recorder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AudioRecorder: Story = {
    args: {
        post: (url: string, data: ApiRequestData, isForm: boolean) => alert(`${url} ${data} ${isForm}`),
    },
};
