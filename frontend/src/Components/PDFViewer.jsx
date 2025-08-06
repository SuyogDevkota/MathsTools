// src/components/PDFViewer.jsx
import React from "react";
import "./PDFViewer.css"; // Optional for styling

const PDFViewer = ({ files }) => {
  if (!files || files.length === 0) {
    return <p>No PDF files found for this group.</p>;
  }

  return (
    <div className="pdf-viewer">
      {files.map((file, index) => (
        <div key={index} className="pdf-item">
          <div className="pdf-title">{file.title}</div>
          <div className="pdf-buttons">
            <a
              href={file.file}
              target="_blank"
              rel="noopener noreferrer"
              className="view-btn"
            >
              View
            </a>
            <a href={file.file} download className="download-btn">
              Download
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PDFViewer;
