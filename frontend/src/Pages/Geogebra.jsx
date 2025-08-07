import React, { useState } from "react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import ToolsViewer from "../Components/ToolsViewer";
import SearchBar from "../Components/SearchBar"; // adjust path if needed

const GeogebraTools = () => {
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
          setFiles((data.files || []).filter(f => f.category === "teacherstools"));
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
      {loading ? <p>Loading...</p> : <ToolsViewer files={filteredFiles.map(f => ({
  ...f,
  title: f.originalName || f.filename || 'Untitled',
  file: f.path ? `${API_BASE_URL.replace('/api','')}/${f.path.replace(/\\/g,'/')}` : ''
}))} />}

    </div>
  );
};

export default GeogebraTools;
