import { $getRoot, $getSelection } from "lexical";
import { useEffect } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

/// import Toolbar from "./Toolbars";
import Toolbars from "./Toolbars";

// const onError = (error) => {
//   console.error(error);
// };

export default function Editor() {
    useEffect(() => {
      const unregisterListener = editor.registerUpdateListener(
        ({ editorState }) => {
          editorState.read(() => {
            const content = $getRoot().getTextContent(); // Or serialize the state
            onChange(content);
          });
        }
      );
      return unregisterListener;
    }, []);

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <Toolbars />

      <RichTextPlugin
        contentEditable={<ContentEditable className="" />}
        placeholder={
          <div className="absolute bottom-10 left-5 text-slate-400">
            Enter Content here...
          </div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  );
}

const exampleTheme = {
  ltr: "ltr", // Tailwind handles text direction automatically
  rtl: "rtl",
  paragraph: "text-base leading-relaxed", // Tailwind for standard paragraph styling
  quote: "border-l-4 pl-4 italic text-gray-600", // Tailwind for blockquote styling
  heading: {
    h1: "text-4xl font-bold", // Large heading
    h2: "text-3xl font-bold", // Medium heading
    h3: "text-2xl font-semibold", // Subheading
    h4: "text-xl font-semibold", // Smaller heading
    h5: "text-lg font-medium", // Small heading
    h6: "text-base font-medium", // Smallest heading
  },
  list: {
    nested: {
      listitem: "ml-4 list-disc", // Nested list item
    },
    ol: "list-decimal ml-4", // Ordered list
    ul: "list-disc ml-4", // Unordered list
    listitem: "mb-2", // List item
    listitemChecked: "line-through", // Checked item (e.g., in a task list)
    listitemUnchecked: "no-underline", // Unchecked item
  },
  hashtag: "text-blue-500", // Tailwind class for hashtags
  image: "rounded-lg shadow-md", // Styling for images
  link: "text-blue-600 underline hover:text-blue-800", // Link styles
  text: {
    bold: "font-bold",
    code: "bg-gray-100 text-red-500 font-mono px-1 rounded", // Inline code styling
    italic: "italic",
    strikethrough: "line-through",
    subscript: "align-sub text-sm", // Approximation for subscript
    superscript: "align-super text-sm", // Approximation for superscript
    underline: "underline",
    underlineStrikethrough: "underline line-through",
  },
  code: "bg-gray-100 text-gray-800 p-2 rounded font-mono", // Code block styling
  codeHighlight: {
    atrule: "text-purple-600 font-mono",
    attr: "text-teal-600 font-mono",
    boolean: "text-amber-500 font-mono",
    builtin: "text-green-500 font-mono",
    cdata: "text-gray-400 font-mono",
    char: "text-green-500 font-mono",
    class: "text-blue-600 font-mono",
    "class-name": "text-indigo-500 font-mono",
    comment: "text-gray-400 italic font-mono",
    constant: "text-red-500 font-mono",
    deleted: "text-red-500 font-mono",
    doctype: "text-gray-400 font-mono",
    entity: "text-yellow-500 font-mono",
    function: "text-purple-600 font-mono",
    important: "text-red-600 font-bold font-mono",
    inserted: "text-green-500 font-mono",
    keyword: "text-purple-600 font-mono",
    namespace: "text-gray-500 font-mono",
    number: "text-amber-500 font-mono",
    operator: "text-gray-700 font-mono",
    prolog: "text-gray-400 italic font-mono",
    property: "text-teal-600 font-mono",
    punctuation: "text-gray-500 font-mono",
    regex: "text-red-500 font-mono",
    selector: "text-green-500 font-mono",
    string: "text-emerald-600 font-mono",
    symbol: "text-amber-500 font-mono",
    tag: "text-blue-500 font-mono",
    url: "text-blue-600 underline font-mono",
    variable: "text-gray-600 font-mono",
  },
};
