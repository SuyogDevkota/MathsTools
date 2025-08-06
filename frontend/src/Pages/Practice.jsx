// src/pages/Olympiad.jsx
import React from 'react';
import pdfData from '../data/generatedPdfList';
import PDFViewer from '../Components/PDFViewer';
import SearchBar from '../Components/SearchBar';
import { useState } from 'react';

const Practice = () => {
      const allFiles = pdfData.practice.root;
      const [searchTerm, setSearchTerm] = useState("");
  
      const filteredFiles = allFiles.filter(file =>
          file.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
  return (
    <div>
      <h1>Practice Questions</h1>
              <SearchBar onSearch={setSearchTerm} />
            <PDFViewer files={filteredFiles} />
    </div>
  );
};

export default Practice;
