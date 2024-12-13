import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND } from "lexical";
import React from "react";

export default function Toolbars() {
 const [editor] = useLexicalComposerContext();

  // Function to toggle bold formatting
const SUPPORTED_FORMATS = ["bold", "italic", "underline", "strikethrough"];

// const toggleFormat = (format) => {
//   if (SUPPORTED_FORMATS.includes(format)) {
//     editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
//   } else {
//     console.warn(`Unsupported format: ${format}`);
//   }
// };


  return (
    <div className="flex flex-wrap space-x-2 items-center border border-slate-600 p-2 h-12">
      <button
        className="p-1 bg-slate-400 hover:bg-slate-500 rounded"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        aria-label="Bold"
        title="Bold"
      >
        B
      </button>
      <button
        className="p-1 bg-slate-400 hover:bg-slate-500 rounded"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
      >
        I
      </button>
      <button
        className="p-1 bg-slate-400 hover:bg-slate-500 rounded"
       // onClick={() => toggleFormat("underline")}
      >
        U
      </button>
      <button
        className="p-1 bg-slate-400 hover:bg-slate-500 rounded"
       // onClick={() => toggleFormat("strikethrough")}
      >
        S
      </button>
    </div>
  );
}
