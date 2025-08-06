import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, placeholder = "Search for books, practice problems, tools..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Mock search results - in real app, this would come from your backend
  const mockSearchData = [
    { id: 1, title: "Algebra Textbook", category: "books", type: "PDF", description: "Comprehensive algebra textbook for grade 9-10" },
    { id: 2, title: "Geometry Practice Problems", category: "practice", type: "PDF", description: "Collection of geometry problems with solutions" },
    { id: 3, title: "Calculus Tools", category: "teacherstools", type: "GGB", description: "Interactive GeoGebra tools for calculus" },
    { id: 4, title: "Olympiad Problems 2024", category: "olympiad", type: "PDF", description: "Recent olympiad problems and solutions" },
    { id: 5, title: "Statistics Guide", category: "teachersguide", type: "PDF", description: "Teacher's guide for statistics curriculum" },
    { id: 6, title: "Fun Math Puzzles", category: "fun", type: "PDF", description: "Engaging math puzzles and brain teasers" }
  ];

  const handleSearch = async (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = mockSearchData.filter(item => 
        item.title.toLowerCase().includes(term.toLowerCase()) ||
        item.description.toLowerCase().includes(term.toLowerCase()) ||
        item.category.toLowerCase().includes(term.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
      setShowResults(true);
    }, 300);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleResultClick = (result) => {
    setShowResults(false);
    setSearchTerm('');
    if (onSearch) {
      onSearch(result);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      books: "📖",
      practice: "✏️",
      olympiad: "🏆",
      teacherstools: "🔧",
      teachersguide: "👨‍🏫",
      fun: "🎮"
    };
    return icons[category] || "📄";
  };

  const getTypeColor = (type) => {
    const colors = {
      PDF: "#e74c3c",
      GGB: "#3498db",
      DOC: "#f39c12"
    };
    return colors[type] || "#95a5a6";
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <div className="search-icon">🔍</div>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setShowResults(true)}
        />
        {isSearching && <div className="search-spinner"></div>}
      </div>

      {showResults && (
        <div className="search-results">
          {searchResults.length > 0 ? (
            <div className="results-list">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="result-icon">
                    {getCategoryIcon(result.category)}
                  </div>
                  <div className="result-content">
                    <div className="result-title">{result.title}</div>
                    <div className="result-description">{result.description}</div>
                    <div className="result-meta">
                      <span className="result-category">{result.category}</span>
                      <span 
                        className="result-type"
                        style={{ backgroundColor: getTypeColor(result.type) }}
                      >
                        {result.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchTerm.trim() && !isSearching ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <p>No results found for "{searchTerm}"</p>
              <p className="no-results-suggestion">Try different keywords or browse categories</p>
            </div>
          ) : null}
        </div>
      )}

      {/* Click outside to close results */}
      {showResults && (
        <div 
          className="search-overlay"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
