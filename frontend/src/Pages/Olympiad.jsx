// src/pages/Olympiad.jsx
import React, { useState } from 'react';
import pdfData from '../data/generatedPdfList';
import PDFViewer from '../components/PDFViewer';
import SearchBar from '../components/SearchBar'; // make sure path is correct

const Olympiad = () => {
  const allFiles = pdfData.olympiad.root;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = allFiles.filter(file =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Olympiad Questions</h1>
      <SearchBar onSearch={setSearchTerm} />
      <PDFViewer files={filteredFiles} />
    </div>
  );
};

export default Olympiad;
