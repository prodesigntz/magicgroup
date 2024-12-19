import React from 'react'
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaQuoteLeft,
  FaLink,
  FaListOl,
  FaListUl,
  FaHeading,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaRedo,
  FaUndo,
} from "react-icons/fa";
import { EditorButton } from './ButtonEditor';
import { Editor,  Range,  Text, Transforms } from 'slate';


// Utility Functions
///// past one
// const isBlockActive = (editor, type) => {
//   const [match] = Editor.nodes(editor, {
//     match: (n) => n.type === type,
//   });
//   return !!match;
// };

const isBlockActive = (editor, type) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => n.type === type,
    })
  );

  return !!match;
};


const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (node) => node[format] === true,
    mode: "all",
  });
  return !!match;
};


const toggleBlock = (editor, type) => {
  console.log(`Toggling block type: ${type}`);

  const isActive = isBlockActive(editor, type);

  console.log(`Is active: ${isActive}`);
   
  // Handle lists specifically
  if (type === 'numbered-list' || type === 'bulleted-list') {
    const isList = ['numbered-list', 'bulleted-list'].includes(
      editor.selection && editor.selection.anchor.path[0]
    );

    Transforms.unwrapNodes(editor, {
      match: n => ['numbered-list', 'bulleted-list'].includes(n.type),
      split: true,
    });

    if (!isActive) {
      const block = { type: type, children: [] };
      Transforms.wrapNodes(editor, block);
    }
    return;
  }

  // Handle other block types
  Transforms.setNodes(
    editor,
    { type: isActive ? 'paragraph' : type },
    { match: n => Editor.isBlock(editor, n) }
  );
};

const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? undefined : true },
    { match: Text.isText, split: true }
  );
};

export const ToolBars = ({ editor }) => {


const insertLink = (editor) => {
  const url = window.prompt("Enter the URL:");
  if (!url) return;

  const { selection } = editor;
  if (!selection) return; // Handle case when no selection exists

 const isCollapsed = Range.isCollapsed(Editor.range(editor, selection));
  try {
    if (isCollapsed) {
      // Insert a link for collapsed selection (cursor position)
      Transforms.insertNodes(editor, {
        type: "link",
        url,
        children: [{ text: url }],
      });
    } else {
      // Wrap the selected text with a link if it's not collapsed
      Transforms.wrapNodes(
        editor,
        {
          type: "link",
          url,
          children: [],
        },
        { split: true }
      );
      // Collapse the selection to the end of the wrapped link (optional)
      Transforms.collapse(editor, { edge: "end" });
    }
  } catch (error) {
    console.error("Error inserting link:", error);
  }
};

  const toolbarConfig = [
    // bold
    {
      format: "bold",
      icon: FaBold,
      action: (editor) => toggleFormat(editor, "bold"),
      ariaLabel: "Bold",
    },

    // italic
    {
      format: "italic",
      icon: FaItalic,
      action: (editor) => toggleFormat(editor, "italic"),
      ariaLabel: "Italic",
    },

    // underline
    {
      format: "underline",
      icon: FaUnderline,
      action: (editor) => toggleFormat(editor, "underline"),
      ariaLabel: "Underline",
    },

    // strikethrough
    {
      format: "strikethrough",
      icon: FaStrikethrough,
      action: (editor) => toggleFormat(editor, "strikethrough"),
      ariaLabel: "Strikethrough",
    },

    // align left
    {
      format: "align_left",
      icon: FaAlignLeft,
      action: (editor) =>
        Transforms.setNodes(
          editor,
          { align: "left" },
          {
            match: (n) => Editor.isBlock(editor, n) && n.type === "paragraph",
          }
        ),
      ariaLabel: "Align Left",
    },

    //align center
    {
      format: "align_center",
      icon: FaAlignCenter,
      action: (editor) =>
        Transforms.setNodes(
          editor,
          { align: "center" },
          {
            match: (n) => Editor.isBlock(editor, n) && n.type === "paragraph",
          }
        ),
      ariaLabel: "Align Center",
    },
    {
      format: "align_right",
      icon: FaAlignRight,
      action: (editor) =>
        Transforms.setNodes(
          editor,
          { align: "right" },
          {
            match: (n) => Editor.isBlock(editor, n) && n.type === "paragraph",
          }
        ),
      ariaLabel: "Align Right",
    },

    // Lists
    {
      format: "numbered-list",
      icon: FaListOl,
      action: (editor) => toggleBlock(editor, "numbered-list"),
      ariaLabel: "Numbered List",
      isActive: (editor) => isBlockActive(editor, "numbered-list"),
    },
    {
      format: "bulleted-list",
      icon: FaListUl,
      action: (editor) => toggleBlock(editor, "bulleted-list"),
      ariaLabel: "Bulleted List",
      isActive: (editor) => isBlockActive(editor, "bulleted-list"),
    },

    // Blockquote
    {
      format: "blockquote",
      icon: FaQuoteLeft,
      action: (editor) => toggleBlock(editor, "blockquote"),
      ariaLabel: "Block Quote",
      isActive: (editor) => isBlockActive(editor, "blockquote"),
    },

    // Headings
    {
      format: "heading-one",
      icon: () => "H1",
      action: (editor) => toggleBlock(editor, "heading-one"),
      ariaLabel: "Heading 1",
      isActive: (editor) => isBlockActive(editor, "heading-one"),
    },
    {
      format: "heading-two",
      icon: () => "H2",
      action: (editor) => toggleBlock(editor, "heading-two"),
      ariaLabel: "Heading 2",
      isActive: (editor) => isBlockActive(editor, "heading-two"),
    },
    {
      format: "heading-three",
      icon: () => "H3",
      action: (editor) => toggleBlock(editor, "heading-three"),
      ariaLabel: "Heading 3",
      isActive: (editor) => isBlockActive(editor, "heading-three"),
    },

    {
      format: "link",
      icon: FaLink,
      action: (editor) => insertLink(editor),
      ariaLabel: "Insert Link",
    },
  
    {
      format: "undo",
      icon: FaUndo,
      action: (editor) => editor.undo(),
      ariaLabel: "Undo",
    },
    {
      format: "redo",
      icon: FaRedo,
      action: (editor) => editor.redo(),
      ariaLabel: "Redo",
    },
  ];
  return (
    <div className="toolbar">
      {toolbarConfig.map(({ format, icon, action, ariaLabel }) => (
        <EditorButton
          key={format}
          icon={icon}
          onClick={() => action(editor)}
          ariaLabel={ariaLabel}
          isActive={isFormatActive(editor, format)}
        />
      ))}
    </div>
  );
};
