import ExampleTheme from "./themes/ExampleTheme";

const editorConfig = {
    namespace: "edit-transcription",
    theme: ExampleTheme,
    editable: false,
    onError(error: Error) {
        throw error;
    },
};

export default editorConfig;
