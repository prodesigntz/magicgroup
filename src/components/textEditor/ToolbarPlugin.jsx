// components/ToolbarPlugin.jsx
import React, { useCallback,useEffect, useState } from "react";
import {
  $isBoldMarkActive,
  $isItalicMarkActive,
  $isUnderlineMarkActive,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import { $getSelection, $isRangeSelection } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  // Function to update the toolbar buttons based on the selection state
  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold($isBoldMarkActive(selection));
      setIsItalic($isItalicMarkActive(selection));
      setIsUnderline($isUnderlineMarkActive(selection));
    }
  }, [editor]);

  // Add command listeners for changes in selection
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateToolbar();
      });
    });
  }, [editor, updateToolbar]);

  const toggleBold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
  };

  const toggleItalic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
  };

  const toggleUnderline = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
  };

  return (
    <div className="toolbar">
      <button
        type="button"
        className={`toolbar-item ${isBold ? "active" : ""}`}
        onClick={toggleBold}
        aria-label="Bold"
      >
        <b>B</b>
      </button>
      <button
        type="button"
        className={`toolbar-item ${isItalic ? "active" : ""}`}
        onClick={toggleItalic}
        aria-label="Italic"
      >
        <i>I</i>
      </button>
      <button
        type="button"
        className={`toolbar-item ${isUnderline ? "active" : ""}`}
        onClick={toggleUnderline}
        aria-label="Underline"
      >
        <u>U</u>
      </button>
      {/* Additional buttons for inserting links and images can be added here */}
    </div>
  );
}
