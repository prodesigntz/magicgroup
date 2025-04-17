"use client";

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Quill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

// Import Quill styles
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['blockquote', 'link'],
    [{ 'align': [] }],
    ['clean']
  ]
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'blockquote', 'link',
  'align'
];

const QuillEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);

  return (
    <div className="quill-editor">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write something..."
        className="min-h-[200px]"
      />
    </div>
  );
};

export default QuillEditor;