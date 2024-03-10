import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { $generateNodesFromDOM, $generateHtmlFromNodes } from "@lexical/html";
import {
    LexicalEditor,
    $getRoot,
    $createTextNode,
    ParagraphNode,
    $insertNodes,
    type EditorState,
} from "lexical";
import _ from "lodash";
import React, { useState, useRef, useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import Button from "react-bootstrap/Button";
import { Transcription } from "../../interfaces/ContainerProps";
import { Pencil, Book, CloudArrowUp } from "../icons/Icons";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import MyCustomAutoFocusPlugin from "./plugins/MyCustomAutoFocusPlugin";
import editorConfig from "./editorConfig";
import "./Editor.scss";

interface EditorProps {
    transcription: Transcription;
    updateTranscription: (transcription: Transcription) => void;
    isDebug?: boolean;
}

const Placeholder = () => <div className="editor-placeholder">Enter some plain text...</div>;

/**
 * Meta Lexical Text Editor.
 *
 * @link: https://github.com/facebook/lexical
 */
const Editor = ({ transcription, updateTranscription, isDebug = false }: EditorProps) => {
    const [ transcriptionEdit, setTranscriptionEdit ] = useState(transcription);
    const [ contentAsHtml, setContentAsHtml ] = useState<string | undefined>(transcription.contentAsHtml);
    const [ isEditable, setIsEditable ] = useState(editorConfig.editable);
    const editorRef = useRef<LexicalEditor>(null);

    const updateEditorState = () => {
        editorRef.current?.update(() => {
            const root = $getRoot();

            if (transcription.contentAsHtml && transcription.contentAsHtml.length > 0) {
                const parser = new DOMParser();
                const dom = parser.parseFromString(transcription.contentAsHtml, "text/html");
                const nodes = $generateNodesFromDOM(editorRef.current as LexicalEditor, dom);

                root.getFirstChild()?.remove();
                root.select();
                $insertNodes(nodes);
            } else {
                const textNode = $createTextNode(transcription.content);
                const paragraph = root.getFirstChild() as ParagraphNode;
                paragraph.append(textNode);
            }

            const contentAsHtml = $generateHtmlFromNodes(editorRef.current as LexicalEditor);
            setContentAsHtml(contentAsHtml);
        });
    };

    useEffect(updateEditorState, []);

    const setEditable = () => {
        editorRef.current?.setEditable(!editorRef.current.isEditable());
        setIsEditable(!!editorRef.current?.isEditable());
    };

    const onChange = (editorState: EditorState, editor: LexicalEditor) => {
        editor.update(() => {
            const htmlFromNodes = $generateHtmlFromNodes(editor);
            setContentAsHtml(htmlFromNodes);
        });

        editorState.read(() => {
            const content = $getRoot().getTextContent();
            setTranscriptionEdit((prevTranscriptionEdit) => ({ ...prevTranscriptionEdit, contentAsHtml, content }));
        });
    };

    const handleSave = () => {
        if (_.isEqual(transcription, transcriptionEdit)) {
            return;
        }

        setEditable();
        updateTranscription(transcriptionEdit);
    };

    return (
        <>
            <LexicalComposer initialConfig={editorConfig}>
                <div className="editor-container">
                    <PlainTextPlugin
                        contentEditable={<ContentEditable className="editor-input" />}
                        placeholder={<Placeholder />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />

                    <EditorRefPlugin editorRef={editorRef} />
                    <OnChangePlugin onChange={onChange} />

                    {isDebug && <TreeViewPlugin />}

                    <HistoryPlugin />
                    <MyCustomAutoFocusPlugin />
                </div>
            </LexicalComposer>

            <div className="mt-3 mx-auto" style={{ width: "fit-content" }}>
                <Button variant="secondary" onClick={setEditable}>
                    {isEditable ? (
                        <>
                            <Book /> <span className="ms-1">Read</span>
                        </>
                    ) : (
                        <>
                            <Pencil /> <span className="ms-1">Edit</span>
                        </>
                    )}
                </Button>

                <Button variant="primary" className="ms-3" onClick={handleSave}>
                    <CloudArrowUp /> <span className="ms-1">Save</span>
                </Button>
            </div>
        </>
    );
};

export default Editor;
