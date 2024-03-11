import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StorybookContextProvider } from "../../hooks/AppContext";
import { Transcription } from "../../interfaces/ContainerProps";
import Editor from "./Editor";

const meta = {
    title: "Web-App/Component/Editor",
    component: Editor,
    decorators: [
        (Story, context) => (
            <div style={ { minHeight: "500px" } }>
                <StorybookContextProvider storybookContext={ context.args }>
                    <Story />
                </StorybookContextProvider>
            </div>
        )
    ],
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fullscreen",
        backgrounds: {
            default: "darkish",
            values: [ { name: "darkish", value: "rgb(33, 37, 41)" } ]
        }
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: [ "autodocs" ]
} satisfies Meta<typeof Editor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextEditor: Story = {
    args: {
        transcription: {
            id: 1,
            content: "This is a test transcription",
            createdAt: "2021-10-10T10:10:10",
            updatedAt: "2021-10-10T10:10:10",
        },
        updateTranscription: (transcription: Transcription) => alert(`Updated transcription: ${transcription.content}`),
        isDebug: true,
    }
};
