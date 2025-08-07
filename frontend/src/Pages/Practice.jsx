// src/pages/Olympiad.jsx
import React from 'react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import PDFViewer from '../Components/PDFViewer';
import SearchBar from '../Components/SearchBar';
import { useState } from 'react';

const Practice = () => {
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
              setFiles((data.files || []).filter(f => f.category === "practice"));
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
  
      const filteredFiles = files.filter(file =>
    (file.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div>
      <h1>Practice Questions</h1>
      <SearchBar onSearch={setSearchTerm} />
      {loading ? <p>Loading...</p> : <PDFViewer files={filteredFiles.map(f => ({
  ...f,
  title: f.originalName || f.filename || 'Untitled',
  file: f.path ? `${API_BASE_URL.replace('/api','')}/${f.path.replace(/\\/g,'/')}` : ''
}))} />}

    </div>
  );
};

export default Practice;
