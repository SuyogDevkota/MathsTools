import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";

import PDFViewer from "../Components/PDFViewer"; // your viewer component
import pdfData from "../data/generatedPdfList";

const BooksPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const files = pdfData.books.root; // or whatever subset you want for this page

  // Filter files based on search term
  const filteredFiles = files.filter((file) =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Books</h1>
      <SearchBar onSearch={setSearchTerm} />
      <PDFViewer files={filteredFiles} />
    </div>
  );
};

export default BooksPage;
