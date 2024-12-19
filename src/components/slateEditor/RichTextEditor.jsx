import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";

import { ToolBars } from "./ToolBars";

//import  EditorButton  from "./EditorButton";



// Main Editor Component
const RichTextEditor = ({newValue,  onChange }) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  ///console.log(editor);

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "Start typing..." }],
    },
  ];

  const [value, setValue] = useState(initialValue );

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const renderElement = useCallback((props) => <Element {...props} />, []);

  const handleKeyDown = (event, editor) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Instead of directly inserting text, insert a new paragraph
      Transforms.insertNodes(editor, {
        type: "paragraph",
        children: [{ text: "" }],
      });
    }
  };

  return (
    <div className="shadow appearance-none border rounded w-full text-slate-700 leading-tight focus:outline-none focus:shadow-outline">
      {/* Editor */}

      <Slate
        editor={editor}
        initialValue={initialValue}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          console.log("val", newValue);
        }}
      >
        <ToolBars editor={editor} />
        <Editable
          // className="min-h-[200px] w-full bg-slate-400 focus:outline-none prose prose-sm sm:prose lg:prose-lg p-2"
          onKeyDown={(event) => handleKeyDown(event, editor)}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          placeholder="Start typing..."
        />
      </Slate>
    </div>
  );
};

// Leaf Renderer for Inline Formatting
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong className="font-bold">{children}</strong>;
  if (leaf.italic) children = <em className="italic">{children}</em>;
  if (leaf.underline) children = <u className="underline">{children}</u>;
  if (leaf.strikethrough) children = <s className="line-through">{children}</s>;
  if (leaf.type === "link") {
      return (
        <a
          {...attributes}
          style={{
            color: "blue",
            textDecoration: "underline",
          }}
        >
          {children}
        </a>
      );
    };
  return <span {...attributes}>{children}</span>;
};

// Block Renderer for Custom Elements
const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "heading-one":
      return (
        <h1 {...attributes} className="text-4xl font-bold mb-4 mt-6">
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 {...attributes} className="text-3xl font-bold mb-3 mt-5">
          {children}
        </h2>
      );
    case "heading-three":
      return (
        <h3 {...attributes} className="text-2xl font-bold mb-3 mt-4">
          {children}
        </h3>
      );
    case "blockquote":
      return (
        <blockquote
          {...attributes}
          className="pl-4 border-l-4 border-gray-300 italic my-4 text-gray-600"
        >
          {children}
        </blockquote>
      );
    case "numbered-list":
      return (
        <ol {...attributes} className="list-decimal pl-8 my-4 space-y-1">
          {children}
        </ol>
      );
    case "bulleted-list":
      return (
        <ul {...attributes} className="list-disc pl-8 my-4 space-y-1">
          {children}
        </ul>
      );
  
    case "list-item":
      return (
        <li
          {...attributes}
          className="pl-1 hover:bg-gray-50 rounded transition-colors duration-200"
        >
          {children}
        </li>
      );

    case "link":
      return (
        <a
          {...attributes}
          href={element.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      );
 
    default:
      return (
        <div style={{ textAlign: element.align || "left" }} {...attributes}>
          {children}
        </div>
      );
  }
};

export default RichTextEditor;
