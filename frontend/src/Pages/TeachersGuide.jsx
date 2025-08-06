import React, { useState } from 'react';

import pdfData from "../data/generatedPdfList";
import PDFViewer from "../Components/PDFViewer";
import SearchBar from '../Components/SearchBar';

const TeachersGuide = () => {
    const allFiles = pdfData.TeachersGuide.root;
    const [searchTerm, setSearchTerm] = useState("");

    const filteredFiles = allFiles.filter(file =>
        file.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div>
            <h1>Teachers Guide</h1>
            <SearchBar onSearch={setSearchTerm} />
            <PDFViewer files={filteredFiles} />
        </div>
    )
}

export default TeachersGuide;