import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ExclamationCircle, FileTypePDF, Floppy, Microphone, Trash, XCircle } from "./Icons";

const iconList = {
    ExclamationCircle: <ExclamationCircle color="#fff" dimension="30" />,
    FileTypePDF: <FileTypePDF color="#fff" dimension="30" />,
    Floppy: <Floppy color="#fff" dimension="30" />,
    Microphone: <Microphone color="#fff" dimension="30" />,
    Trash: <Trash color="#fff" dimension="30" />,
    XCircle: <XCircle color="#fff" dimension="30" />,
};

/** A story that shows all icons.*/
const Icons = () => {
    const listElements = Object.entries(iconList).map(([ name, Icon ]) => (
        <li key={name} style={{ marginBottom: "1rem" }}>{name}: {Icon}</li>
    ));

    return (<ul>{listElements}</ul>);
};

const meta = {
    title: "Web-App/Icons/Icons",
    component: Icons,
    decorators: [
        (Story, context) => (
            <div style={{ minHeight: "500px", padding: "1rem" }}>
                <Story {...context.args}/>
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
} satisfies Meta<typeof Icons>;

export default meta;

type Story = StoryObj<typeof Icons>;

export const IconsStory: Story = {
    args: {
        color: "#fff",
        dimension: 50,
    },
};
