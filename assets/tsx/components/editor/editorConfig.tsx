import { EmojiNode } from "./nodes/EmojiNode";
import ExampleTheme from "./themes/ExampleTheme";

const editorConfig = {
    namespace: "example",
    theme: ExampleTheme,
    onError(error: Error) {
        throw error;
    },
    nodes: [ EmojiNode ]
};

export default editorConfig;
