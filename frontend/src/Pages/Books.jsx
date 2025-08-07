import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";

import PDFViewer from "../Components/PDFViewer"; // your viewer component
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BooksPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/files/all`);
        if (res.ok) {
          const data = await res.json();
          // Filter files for books category only
          setFiles((data.files || []).filter(f => f.category === "books"));
        } else {
          setFiles([]);
        }
      } catch (e) {
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  // Filter files based on search term
  const filteredFiles = files.filter((file) =>
    (file.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Books</h1>
      <SearchBar onSearch={setSearchTerm} />
      {loading ? <p>Loading...</p> : <PDFViewer files={filteredFiles.map(f => ({
  ...f,
  title: f.originalName || f.filename || 'Untitled',
  file: f.path ? `${API_BASE_URL.replace('/api','')}/${f.path.replace(/\\/g,'/')}` : ''
}))} />}

    </div>
  );
};

export default BooksPage;
