"use client";

import React, { useState, useEffect } from "react";
import { $getRoot, $getSelection } from "lexical";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const theme = {
  // Theme styling goes here
  //...
};

// Catch any errors that occur during Lexical updates and log them
function onError(error) {
  console.error(error);
}

function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState);
    });
  }, [editor, onChange]);
  return null;
}

export default function EditorComponent() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  const [editorState, setEditorState] = useState();
  function onChange(editorState) {
    setEditorState(editorState);
  }

  useEffect(() => {
    if (editorState) {
      console.log(editorState); // Optional: Handle or log editor state
    }
  }, [editorState]);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={
          <div className="absolute top-10 left-5 text-slate-400">
            Enter Content here...
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <MyOnChangePlugin onChange={onChange} /> 
    </LexicalComposer>
  );
}
