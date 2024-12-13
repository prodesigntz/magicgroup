"use client";


import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import Toolbars from "./Toolbars";
import { HeadingNode } from "@lexical/rich-text";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"; // New plugin

//import LoadState from "./loadState";

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

export default function Editor({ onChange }) {
  const initialConfig = {
    namespace: "MyEditor",
    theme: exampleTheme,
    onError,
    nodes: [HeadingNode],
    editable: true,
  };

  const handleChange = (editorState) => {
    editorState.read(() => {
      const content = JSON.stringify(editorState.toJSON()); // Serialize the editor state
      if (onChange) {
        onChange(content); // Pass the content to the parent component
      }
    });
  };

  //console.log("onChange....", onChange);

  return (
    <div className="">
      <LexicalComposer initialConfig={initialConfig}>
        {/* <LoadState /> */}
        <Toolbars />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="h-30 shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline" />
          }
          placeholder={
            <div className="absolute bottom-2 left-5 text-slate-400">
              Enter Content here...
            </div>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
        <OnChangePlugin onChange={handleChange} /> {/* Add the plugin here */}
      </LexicalComposer>
    </div>
  );
}


const exampleTheme = {
  ltr: "ltr",
  rtl: "rtl",
  paragraph: "",
  quote: "bg-gray-100 p-2 border-l-4 border-gray-400",
  heading: {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-bold",
    h3: "text-xl font-bold",
    h4: "text-lg font-bold",
    h5: "text-md font-bold",
    h6: "text-sm font-bold",
  },
  list: {
    nested: {
      listitem: "ml-4",
    },
    ol: "list-decimal",
    ul: "list-disc",
    listitem: "",
    listitemChecked: "text-green-600",
    listitemUnchecked: "",
  },
  hashtag: "text-blue-600",
  image: "max-w-full h-auto",
  link: "text-blue-600 hover:text-blue-800",
  text: {
    bold: "font-bold",
    code: "bg-gray-100 p-1 text-sm font-mono",
    italic: "italic",
    strikethrough: "line-through",
    subscript: "text-subscript",
    superscript: "text-superscript",
    underline: "underline",
    underlineStrikethrough: "underline line-through",
  },
  code: "bg-gray-100 p-2 text-sm font-mono",
  codeHighlight: {
    atrule: "text-purple-600",
    attr: "text-cyan-600",
    boolean: "text-orange-600",
    builtin: "text-yellow-600",
    cdata: "text-gray-600",
    char: "text-green-600",
    class: "text-blue-600",
    "class-name": "text-blue-600",
    comment: "text-gray-600",
    constant: "text-orange-600",
    deleted: "text-red-600",
    doctype: "text-gray-600",
    entity: "text-red-600",
    function: "text-yellow-600",
    important: "text-yellow-600",
    inserted: "text-green-600",
    keyword: "text-blue-600",
    namespace: "text-purple-600",
    number: "text-orange-600",
    operator: "text-red-600",
    prolog: "text-gray-600",
    property: "text-cyan-600",
    punctuation: "text-gray-600",
    regex: "text-yellow-600",
    selector: "text-blue-600",
    string: "text-green-600",
    symbol: "text-orange-600",
    tag: "text-red-600",
    url: "text-cyan-600",
    variable: "text-purple-600",
  },
};