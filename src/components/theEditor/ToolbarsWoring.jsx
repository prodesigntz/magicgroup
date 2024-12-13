import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import React, { useCallback, useEffect, useState } from "react";
import { mergeRegister } from "@lexical/utils";

export default function Toolbars() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Update toolbar buttons state based on the current selection
    const $updateToolbar = useCallback(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        // Update text format
        setIsBold(selection.hasFormat("bold"));
        setIsItalic(selection.hasFormat("italic"));
      }
    }, []);


  useEffect(() => {
    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read($updateToolbar);
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
    return () => {
      unregister();
    };
  }, [editor, $updateToolbar]);

  // Handle heading selection
   const handleBold = (e) => {
     e.preventDefault(); // Prevent form submission on button click
     editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
   };

   const handleItalic = (e) => {
     e.preventDefault(); // Prevent form submission on button click
     editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
   };

   const handleHeading = (e) => {
     e.preventDefault(); // Prevent form submission on button click
     editor.update(() => {
       const selection = $getSelection();
       if ($isRangeSelection(selection)) {
         // Update text format to Heading
         $setBlocksType(selection, () => $createHeadingNode("h1"));
       }
     });
   };

   const handleUndo = (e) => {
     e.preventDefault(); // Prevent form submission on button click
     if (canUndo) {
       editor.dispatchCommand(UNDO_COMMAND, undefined);
     }
   };

  return (
    <div className="space-x-3">
      {/* Bold Button */}
      <button
        onClick={handleBold}
        className={`size-8 rounded-md ${isBold ? "bg-gray-200" : ""}`}
        title="Bold"
      >
        <b>B</b>
      </button>

      {/* Italic Button */}
      <button
        onClick={(e) => {
          e.preventDefault(); // Prevent form submission on button click
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={`size-8 rounded-md italic ${isItalic ? "bg-gray-200" : ""}`}
        title="Italic"
      >
        I
      </button>

      {/* Heading Selector */}
      {[1, 2, 3].map((level) => (
        <button
          key={level}
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission on button click
            handleHeading(`h${level}`);
          }}
          className="size-8 rounded-md"
          title={`Heading ${level}`}
        >
          H{level}
        </button>
      ))}

      {/* Undo Button */}
      <button
        disabled={!canUndo}
        onClick={(e) => {
          e.preventDefault(); // Prevent form submission on button click
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced disabled:text-gray-500"
        aria-label="Undo"
        title="Undo"
      >
        Undo
      </button>

      {/* Redo Button */}
      <button
        disabled={!canRedo}
        onClick={(e) => {
          e.preventDefault(); // Prevent form submission on button click
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced disabled:text-gray-500"
        aria-label="Redo"
        title="Redo"
      >
        Redo
      </button>
    </div>
  );
}
