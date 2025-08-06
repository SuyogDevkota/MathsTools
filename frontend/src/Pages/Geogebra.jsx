import React, { useState } from "react";
import pdfData from "../data/generatedPdfList";
import ToolsViewer from "../Components/ToolsViewer";
import SearchBar from "../Components/SearchBar"; // adjust path if needed

const GeogebraTools = () => {
  const allFiles = pdfData.Teacherstools.root;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = allFiles.filter(file =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Geogebra Tools</h1>

      <p
        style={{
          backgroundColor: "#fffae6",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <strong>Notice:</strong> To open the Geogebra files (.ggb), you must have
        the Geogebra application installed on your computer. You can download it
        safely from the official website:{" "}
        <a
          href="https://www.geogebra.org/download"
          target="_blank"
          rel="noopener noreferrer"
        >
          geogebra.org/download
        </a>.
      </p>

      <SearchBar onSearch={setSearchTerm} />
      <ToolsViewer files={filteredFiles} />
    </div>
  );
};

export default GeogebraTools;
