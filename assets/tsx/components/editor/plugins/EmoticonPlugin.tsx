// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { $createEmojiNode } from "../nodes/EmojiNode";
import { useEffect } from "react";
import { LexicalEditor, TextNode } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function emoticonTransform(node: never) {
    const textContent = node.getTextContent();
    // When you type :), we will replace it with an emoji node
    if (textContent === ":)") {
        node.replace($createEmojiNode("emoji happysmile", "🙂"));
    }
}

function useEmoticons(editor: LexicalEditor) {
    useEffect(() => {
        const removeTransform = editor.registerNodeTransform(
            TextNode as never,
            emoticonTransform
        );
        return () => {
            removeTransform();
        };
    }, [ editor ]);
}

export default function EmoticonPlugin() {
    const [ editor ] = useLexicalComposerContext();
    useEmoticons(editor);
    return null;
}
