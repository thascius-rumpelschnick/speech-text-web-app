import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import EmoticonPlugin from "./plugins/EmoticonPlugin";
import MyCustomAutoFocusPlugin from "./plugins/MyCustomAutoFocusPlugin";
import editorConfig from "./editorConfig";
import onChange from "./onChange";
import "./Editor.scss";

const Placeholder = () => <div className="editor-placeholder">Enter some plain text...</div>;

/**
 * Meta Lexical Text Editor.
 *
 * @link: https://github.com/facebook/lexical
 */
const Editor = () => {
    return (
        <LexicalComposer initialConfig={ editorConfig }>
            <div className="editor-container">
                <PlainTextPlugin
                    contentEditable={ <ContentEditable className="editor-input"/> }
                    placeholder={ <Placeholder/> }
                    ErrorBoundary={ LexicalErrorBoundary }
                />
                <OnChangePlugin onChange={ onChange }/>
                <HistoryPlugin/>
                <TreeViewPlugin/>
                <EmoticonPlugin/>
                <MyCustomAutoFocusPlugin/>
            </div>
        </LexicalComposer>
    );
};

export default Editor;
