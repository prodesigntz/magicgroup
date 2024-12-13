import React, { useCallback, useMemo, useState } from "react";
import { createEditor, Transforms, Text, Editor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { FaBold, FaItalic, FaUnderline, FaStrikethrough } from "react-icons/fa";
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";


const RichTextEditor = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "Start typing..." }],
    },
  ];
  const [value, setValue] = useState(initialValue);

  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const renderElement = useCallback((props) => <Element {...props} />, []);

  // const toggleFormat = (format) => {
  //   const isActive = isFormatActive(editor, format);
  //   Transforms.setNodes(
  //     editor,
  //     { [format]: isActive ? null : true },
  //     { match: Text.isText, split: true }
  //   );
  // };

  // const isFormatActive = (editor, format) => {
  //   const [match] = Array.from(
  //     editor.nodes(editor, {
  //       match: (n) => n[format] === true,
  //       universal: true,
  //     })
  //   );
  //   return !!match;
  // };

const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);

  Transforms.setNodes(
    editor,
    { [format]: isActive ? undefined : true }, // Toggle the format
    { match: Text.isText, split: true } // Ensure it applies to text nodes
  );
};

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (node) => node[format] === true, // Check if the format is active
    mode: "all", // Look through all text nodes
  });
  return !!match; // Return true if a match is found
};


  return (
    <div>
      {/* Toolbar */}
      <div className="toolbar">
        <button
          type="button"
          aria-label="Bold"
          aria-pressed={isFormatActive(editor, "bold")}
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleFormat(editor,"bold");
          }}
        >
          <FaBold />
        </button>

        <button
          type="button"
          aria-label="Italic"
          aria-pressed={isFormatActive(editor, "italic")}
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleFormat(editor,"italic");
          }}
        >
          <FaItalic />
        </button>

        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault(); // Prevent default behavior
            event.stopPropagation();  // Prevent default behavior
            toggleFormat(editor,"underline"); // Toggle underline
          }}
        >
          <FaUnderline />
        </button>
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleFormat(editor, "strikethrough");
          }}
        >
          <FaStrikethrough />
        </button>
        {/* Alignment Buttons */}
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            Transforms.setNodes(
              editor,
              { align: "left" },
              {
                match: (n) =>
                  Editor.isBlock(editor, n) && n.type === "paragraph",
              }
            );
          }}
        >
          <FaAlignLeft />
        </button>
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            Transforms.setNodes(
              editor,
              { align: "center" },
              {
                match: (n) =>
                  Editor.isBlock(editor, n) && n.type === "paragraph",
              }
            );
          }}
        >
          <FaAlignCenter />
        </button>
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            event.stopPropagation();
            Transforms.setNodes(
              editor,
              { align: "right" },
              {
                match: (n) =>
                  Editor.isBlock(editor, n) && n.type === "paragraph",
              }
            );
          }}
        >
          <FaAlignRight />
        </button>
      </div>
      {/* Editor */}
      <Slate
        editor={editor}
        initialValue={initialValue}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Editable
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          placeholder="Start typing..."
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }
            switch (event.key) {
              case "b": {
                event.preventDefault();
                toggleFormat(editor, "bold");
                break;
              }
              case "i": {
                event.preventDefault();
                toggleFormat(editor, "italic");
                break;
              }
              case "u": {
                event.preventDefault();
                toggleFormat(editor, "underline");
                break;
              }
              default:
                break;
            }
          }}
        />
      </Slate>
    </div>
  );
};

// Leaf Renderer for Text Formatting
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }
  return <span {...attributes}>{children}</span>;
};

// Block Renderer for Custom Elements
const Element = ({ attributes, children, element }) => {
  switch (element.align) {
    case "left":
      return (
        <div style={{ textAlign: "left" }} {...attributes}>
          {children}
        </div>
      );
    case "center":
      return (
        <div style={{ textAlign: "center" }} {...attributes}>
          {children}
        </div>
      );
    case "right":
      return (
        <div style={{ textAlign: "right" }} {...attributes}>
          {children}
        </div>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default RichTextEditor;