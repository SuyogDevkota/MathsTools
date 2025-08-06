import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredContent] = useState([
    {
      title: "Latest Math Resources",
      description: "Access the newest textbooks, practice problems, and study materials",
      image: "📚",
      link: "/books"
    },
    {
      title: "Olympiad Preparation",
      description: "Specialized materials for mathematics competitions and olympiads",
      image: "🏆",
      link: "/olympiad"
    },
    {
      title: "Interactive Tools",
      description: "GeoGebra tools and calculators for hands-on learning",
      image: "🔧",
      link: "/tools/geogebra"
    }
  ]);

  // Auto-rotate featured content
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredContent.length]);

  const quickAccessCards = [
    { title: "Books", icon: "📖", link: "/books", color: "#4CAF50" },
    { title: "Practice", icon: "✏️", link: "/practice", color: "#2196F3" },
    { title: "Olympiad", icon: "🏆", link: "/olympiad", color: "#FF9800" },
    { title: "Calculator", icon: "🧮", link: "/calculator", color: "#FF5722" },
    { title: "Tools", icon: "🔧", link: "/tools/geogebra", color: "#9C27B0" },
    { title: "Fun Math", icon: "🎮", link: "/fun", color: "#E91E63" },
    { title: "Teacher's Guide", icon: "👨‍🏫", link: "/teachersguide", color: "#607D8B" }
  ];

  const handleSearch = (result) => {
    // Handle search result click - navigate to appropriate page
    console.log('Search result clicked:', result);
    // You can add navigation logic here based on the result category
  };

  return (
    <div className="home">
      {/* Enhanced Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="highlight">Mathematics Universe</span>
            </h1>
            <p className="hero-subtitle">
              Discover the beauty of mathematics through interactive lessons, 
              comprehensive resources, and expert guidance from Mr. Raj Kumar Kandel
            </p>
            <div className="hero-buttons">
              <Link to="/books">
                <button className="primary-btn">Explore Resources</button>
              </Link>
              <Link to="/about">
                <button className="secondary-btn">Learn More</button>
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="math-animation">
              <span className="formula">∫ x² dx</span>
              <span className="formula">πr²</span>
              <span className="formula">√(a² + b²)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Carousel */}
      <section className="featured-section">
        <h2>Featured Content</h2>
        <div className="featured-carousel">
          <div className="carousel-container">
            {featuredContent.map((item, index) => (
              <div 
                key={index}
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <div className="featured-card">
                  <div className="featured-icon">{item.image}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Link to={item.link}>
                    <button className="featured-btn">Explore</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-dots">
            {featuredContent.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <h2>Find What You Need</h2>
        <SearchBar onSearch={handleSearch} placeholder="Search for books, practice problems, tools, and more..." />
      </section>

      {/* Quick Access Cards */}
      <section className="quick-access">
        <h2>Quick Access</h2>
        <div className="access-grid">
          {quickAccessCards.map((card, index) => (
            <Link key={index} to={card.link} className="access-card">
              <div className="card-icon" style={{ backgroundColor: card.color }}>
                {card.icon}
              </div>
              <h3>{card.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Enhanced Subjects Section */}
      <section className="subjects">
        <h2>Subjects Taught</h2>
        <div className="subject-cards">
          <div className="subject-card">
            <div className="subject-icon">📐</div>
            <h3>Geometry</h3>
            <p>Shapes, angles, and spatial reasoning</p>
          </div>
          <div className="subject-card">
            <div className="subject-icon">📊</div>
            <h3>Statistics</h3>
            <p>Data analysis and probability</p>
          </div>
          <div className="subject-card">
            <div className="subject-icon">➗</div>
            <h3>Algebra</h3>
            <p>Equations, functions, and variables</p>
          </div>
          <div className="subject-card">
            <div className="subject-icon">📈</div>
            <h3>Calculus</h3>
            <p>Derivatives, integrals, and limits</p>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials */}
      <section className="testimonials">
        <h2>What Students Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"Mr. Kandel makes complex math concepts easy to understand. His teaching style is amazing!"</p>
            </div>
            <div className="testimonial-author">
              <span className="author-name">- Sita, Grade 9</span>
              <span className="author-rating">⭐⭐⭐⭐⭐</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"Thanks to his guidance, I topped my board exams. The practice materials are excellent!"</p>
            </div>
            <div className="testimonial-author">
              <span className="author-name">- Ram, Grade 10</span>
              <span className="author-rating">⭐⭐⭐⭐⭐</span>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The interactive tools and resources helped me understand geometry better than ever!"</p>
            </div>
            <div className="testimonial-author">
              <span className="author-name">- Priya, Grade 8</span>
              <span className="author-rating">⭐⭐⭐⭐⭐</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="contact">
        <h2>Get in Touch</h2>
        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <div>
              <h3>Email</h3>
              <a href="mailto:rajkumar@email.com">rajkumar@email.com</a>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🏫</span>
            <div>
              <h3>School</h3>
              <p>Narayani Model Secondary School</p>
            </div>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📚</span>
            <div>
              <h3>Resources</h3>
              <p>Comprehensive math materials available</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
