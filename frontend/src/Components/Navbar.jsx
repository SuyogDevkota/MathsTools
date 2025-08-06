import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import hamburger from "../assets/hamburger.svg";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownOpenedBy, setDropdownOpenedBy] = useState(null); // "click" | "hover"
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);


  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
const handleNavLinkClick = () => {
  if (window.innerWidth < 1000) {
    setIsMobileMenuOpen(false); // this is the correct state to close the menu
    setOpenDropdown(null);      // also close any dropdown if open
  }
};



  const handleDropdownToggle = (menu) => {
    if (isMobile) {
      setOpenDropdown((prev) => (prev === menu ? null : menu));
    } else {
      if (openDropdown === menu && dropdownOpenedBy === "click") {
        setOpenDropdown(null);
        setDropdownOpenedBy(null);
      } else {
        setOpenDropdown(menu);
        setDropdownOpenedBy("click");
      }
    }
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1000);
    if (window.innerWidth > 1000) {
      setOpenDropdown(null);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        if (dropdownOpenedBy === "click") {
          setOpenDropdown(null);
          setDropdownOpenedBy(null);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpenedBy]);

  const handleMouseLeave = () => {
    if (!isMobile && dropdownOpenedBy === "hover") {
      const timeout = setTimeout(() => {
        setOpenDropdown(null);
        setDropdownOpenedBy(null);
      }, 200);
      setHoverTimeout(timeout);
    }
  };

  const cancelMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo" >MindSprint</Link>
          <img
            className="hamburger"
            src={hamburger}
            alt="menu"
            onClick={toggleMenu}
          />

          <div className={`nav-links ${isMobileMenuOpen ? "show" : ""}`}>
            <Link to="/" className="nav-link" onClick={handleNavLinkClick}>Home</Link>

            <div
              className={`dropdown ${openDropdown === "books" ? "open" : ""}`}
              onClick={() => handleDropdownToggle("books")}
              onMouseEnter={() => {
                if (!isMobile) {
                  setOpenDropdown("books");
                  setDropdownOpenedBy("hover");
                  cancelMouseLeave();
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/books" className="nav-link" onClick={handleNavLinkClick}>Books</Link>

              {/* There will not be such necessity to have a dropdown for books in the navbar as per the current context. */}


              {/* <ul
                className="dropdown-content"
                onMouseEnter={cancelMouseLeave}
                onMouseLeave={handleMouseLeave}
              >
                <li><Link to="/books/class1-5">Class 1–5</Link></li>
                <li><Link to="/books/class6-8">Class 6–8</Link></li>
                <li><Link to="/books/class9-12">Class 9–12</Link></li>
              </ul> */}
            </div>

            <Link to="/practice" className="nav-link" onClick={handleNavLinkClick}>Practice</Link>

            <div
              className={`dropdown ${openDropdown === "tools" ? "open" : ""}`}
              onClick={() => handleDropdownToggle("tools")}
              onMouseEnter={() => {
                if (!isMobile) {
                  setOpenDropdown("tools");
                  setDropdownOpenedBy("hover");
                  cancelMouseLeave();
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="nav-link">Tools</div>
              <ul
                className="dropdown-content"
                onMouseEnter={cancelMouseLeave}
                onMouseLeave={handleMouseLeave}
              >
                <li><Link to="/tools/geogebra" onClick={handleNavLinkClick}>GeoGebra</Link></li>
                <li><Link to="/tools/calculator" onClick={handleNavLinkClick}>Calculator</Link></li>
                <li><Link to="/tools/grapher" onClick={handleNavLinkClick}>Grapher</Link></li>
              </ul>
            </div>

            <Link to="/olympiad" className="nav-link" onClick={handleNavLinkClick}>Olympiad</Link>
            <Link to="/teachersguide" className="nav-link" onClick={handleNavLinkClick}>TeachersGuide</Link>
            <Link to="/fun" className="nav-link" onClick={handleNavLinkClick}>Fun</Link>
            <Link to="/about" className="nav-link" onClick={handleNavLinkClick}>About</Link>

            <div
              className={`dropdown ${openDropdown === "contact" ? "open" : ""}`}
              onClick={() => handleDropdownToggle("contact")}
              onMouseEnter={() => {
                if (!isMobile) {
                  setOpenDropdown("contact");
                  setDropdownOpenedBy("hover");
                  cancelMouseLeave();
                }
              }}
              onMouseLeave={handleMouseLeave}
            >
              <div className="nav-link">Contact</div>
              <div
                className="dropdown-content contact-dropdown"
                onMouseEnter={cancelMouseLeave}
                onMouseLeave={handleMouseLeave}
              >
                <div className="contact-item"><strong>Phone:</strong> +977-123-4567890</div>
                <div className="contact-item"><strong>Email:</strong> example@mail.com</div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
    </>
  );
};

export default Navbar;
