import React, { useCallback, useEffect, useState } from "react";
import { $createHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from "@lexical/selection";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $getRoot,
  //$setBlocksType,
} from "lexical";
import { mergeRegister } from "@lexical/utils";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaListUl,
  FaListOl,
  FaUndo,// These functions are used but not imported
  FaRedo,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaLink,
  FaStrikethrough,
  //FaClear,
} from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { $createListNode } from "@lexical/list";

// Helper function to update toolbar buttons
const updateTextFormat = (selection, setTextFormat) => {
  setTextFormat({
    bold: selection.hasFormat("bold"),
    italic: selection.hasFormat("italic"),
    underline: selection.hasFormat("underline"),
    strikethrough: selection.hasFormat("strikethrough"),
  });
};

export default function Toolbars() {
 const [editor] = useLexicalComposerContext();

 // const editor = $getRoot();

  const [textFormat, setTextFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      updateTextFormat(selection, setTextFormat);
    }
  }, []);

  useEffect(() => {
    mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        1
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        1
      )
    );
  }, [editor, $updateToolbar]);

  const handleTextFormat = (command, e) => {
    e.preventDefault(); // Prevent default behavior (e.g., form submission)
    try {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, command); // Dispatch the formatting command to the editor
    } catch (error) {
      console.error(`Failed to apply ${command} formatting:`, error); // Log any errors encountered
    }
  };

  // const handleHeading = (level, e) => {
  //   e.preventDefault(); // Prevent default behavior (e.g., form submission)
  //   if (editor.isActive()) {
  //     editor.update(() => {
  //       const selection = $getSelection();
  //       if ($isRangeSelection(selection)) {
  //         $setBlocksType(selection, () => $createHeadingNode(level));
  //       }
  //     });
  //   }
  // };

  const handleHeading = (level, e) => {
    e.preventDefault(); // Prevent default behavior (e.g., form submission)
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(level));
      }
    });
  };

  const handleList = (type, e) => {
    e.preventDefault(); // Prevent default behavior (e.g., form submission)
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createListNode(type));
      }
    });
  };

  const handleAlignment = (alignment, e) => {
    e.preventDefault();
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, alignment);
  };

  const handleLink = (e) => {
    e.preventDefault(); // Prevent default behavior (e.g., form submission)

    const url = prompt("Enter the link URL");
    if (url !== null) {
      try {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, "link", url);
      } catch (error) {
        console.error("Failed to create link:", error);
      }
    }
  };

  const handleClearFormatting = (e) => {
    e.preventDefault();
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "remove");
  };

  //console.log("COntent: ....",editor);

  return (
    <div className="space-x-3 flex items-center">
      {/* Text Formatting Buttons */}
      <button
        type="button"
        onClick={(e) => handleTextFormat("bold", e)}
        className={`p-2 ${textFormat.bold ? "bg-gray-200" : ""}`}
        aria-label="Bold text"
        title="Bold"
      >
        <FaBold />
      </button>
      <button
        type="button"
        onClick={(e) => handleTextFormat("italic", e)}
        className={`p-2 ${textFormat.italic ? "bg-gray-200" : ""}`}
        aria-label="Italic text"
        title="Italic"
      >
        <FaItalic />
      </button>
      <button
        type="button"
        onClick={(e) => handleTextFormat("underline", e)}
        className={`p-2 ${textFormat.underline ? "bg-gray-200" : ""}`}
        aria-label="Underline text"
        title="Underline"
      >
        <FaUnderline />
      </button>
      <button
        type="button"
        onClick={(e) => handleTextFormat("strikethrough", e)}
        className={`p-2 ${textFormat.strikethrough ? "bg-gray-200" : ""}`}
        aria-label="Strikethrough text"
        title="Strikethrough"
      >
        <FaStrikethrough />
      </button>

      {/* Block Formatting Buttons */}
      <button
        type="button"
        onClick={(e) => handleHeading( "h1", e)}
        className="p-2 flex items-center"
        title="Heading 1"
      >
        <FaHeading />1
      </button>

      <button
        type="button"
        onClick={(e) => handleHeading( "h2", e)}
        className="p-2 flex items-center"
        title="Heading 2"
      >
        <FaHeading />2
      </button>

      <button
        type="button"
        onClick={(e) => handleHeading( "h3", e)}
        className="p-2 flex items-center"
        title="Heading 3"
      >
        <FaHeading />3
      </button>

      {/* List Operations */}
      <button
        type="button"
        onClick={(e) => handleList("ul", e)}
        className="p-2"
      >
        <FaListUl />
      </button>
      <button
        type="button"
        onClick={(e) => handleList("ol", e)}
        className="p-2"
      >
        <FaListOl />
      </button>

      {/* Undo/Redo Buttons */}
      <button
        type="button"
        onClick={(e) => editor.dispatchCommand(UNDO_COMMAND, e)}
        className={`p-2 ${!canUndo ? "text-gray-400" : ""}`}
        disabled={!canUndo}
      >
        <FaUndo />
      </button>
      <button
        type="button"
        onClick={(e) => editor.dispatchCommand(REDO_COMMAND, e)}
        className={`p-2 ${!canRedo ? "text-gray-400" : ""}`}
        disabled={!canRedo}
      >
        <FaRedo />
      </button>

      {/* Alignment Buttons */}
      <button
        type="button"
        onClick={(e) => handleAlignment("left", e)}
        className="p-2"
      >
        <FaAlignLeft />
      </button>
      <button
        type="button"
        onClick={(e) => handleAlignment("center", e)}
        className="p-2"
      >
        <FaAlignCenter />
      </button>
      <button
        type="button"
        onClick={(e) => handleAlignment("right", e)}
        className="p-2"
      >
        <FaAlignRight />
      </button>

      {/* Link Management */}
      <button type="button" onClick={(e) => handleLink(e)} className="p-2">
        <FaLink />
      </button>

      {/* Clear Formatting */}
      <button
        type="button"
        onClick={(e) => handleClearFormatting(e)}
        className="p-2"
      >
        <FaDeleteLeft />
      </button>
    </div>
  );
}

