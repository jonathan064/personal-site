"use client";
import React, { useState, useEffect } from "react";

// Define the type for a single navigation link
interface NavLink {
  id: string; // The ID of the section to scroll to
  label: string; // The text displayed in the navigation link
}

// Define the props for the Navbar component
interface NavbarProps {
  links?: NavLink[]; // An array of navigation links, now optional
}

const Navbar: React.FC<NavbarProps> = ({ links = [] }) => {
  // Provide a default empty array for links
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control mobile menu visibility
  const [activeSection, setActiveSection] = useState(""); // State to track the currently active section

  // Function to handle smooth scrolling to a section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Temporarily remove scroll listener to prevent it from fighting with smooth scroll
      // A small delay or a flag could be used for more robust handling
      // For simplicity, we'll just set the active section here
      setActiveSection(id);

      element.scrollIntoView({
        behavior: "smooth", // Enable smooth scrolling
        block: "start" // Align the top of the element with the top of the viewport
      });

      setIsMenuOpen(false); // Close the mobile menu after clicking a link
    }
  };

  // Effect to listen for scroll events and update the activeSection state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      let currentActiveId = "";

      for (const link of links) {
        const section = document.getElementById(link.id);
        if (section) {
          // Adjust this value if your sticky header covers content
          const offset = 100; // Account for navbar height and some buffer

          if (
            scrollPosition >= section.offsetTop - offset &&
            scrollPosition < section.offsetTop + section.offsetHeight - offset
          ) {
            currentActiveId = link.id;
            break; // Found the active section, no need to check further
          }
        }
      }
      if (currentActiveId !== activeSection) {
        setActiveSection(currentActiveId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call once on mount to set initial active section
    handleScroll();

    // Cleanup function: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [links, activeSection]); // Re-run effect if links or activeSection changes

  return (
    <>
      <style jsx>{`
        /* Base styles for the navbar */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(
            to right,
            #2563eb,
            #6d28d9
          ); /* from-blue-600 to-purple-700 */
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-lg */
          z-index: 50;
          padding: 1rem; /* p-4 */
          font-family: "Inter", sans-serif;
        }

        .navbar-container {
          max-width: 1280px; /* equivalent to container mx-auto */
          margin-left: auto;
          margin-right: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          font-size: 1.5rem; /* text-2xl */
          font-weight: bold;
          border-radius: 0.375rem; /* rounded-md */
          padding: 0.5rem 0.75rem; /* px-3 py-2 */
          transition: background-color 0.3s ease;
        }

        .navbar-brand:hover {
          background-color: #1d4ed8; /* hover:bg-blue-700 */
        }

        /* Mobile menu button */
        .menu-button {
          padding: 0.5rem; /* p-2 */
          border-radius: 0.375rem; /* rounded-md */
          outline: none;
          border: none;
          background: transparent;
          cursor: pointer;
        }

        .menu-button:focus {
          box-shadow: 0 0 0 2px white; /* focus:ring-2 focus:ring-white */
        }

        .menu-button svg {
          width: 1.5rem; /* w-6 */
          height: 1.5rem; /* h-6 */
        }

        /* Desktop navigation links */
        .nav-links-desktop {
          display: none; /* hidden by default */
          gap: 1.5rem; /* space-x-6 */
        }

        .nav-link {
          padding: 0.5rem 1rem; /* px-4 py-2 */
          border-radius: 0.375rem; /* rounded-md */
          font-size: 1.126rem; /* text-lg */
          font-weight: 500; /* font-medium */
          transition: background-color 0.3s ease, color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .nav-link:hover {
          background-color: #3b82f6; /* hover:bg-blue-500 */
          color: white;
        }

        .nav-link.active {
          background-color: #1d4ed8; /* bg-blue-700 */
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
        }

        /* Mobile navigation menu */
        .nav-menu-mobile {
          margin-top: 1rem; /* mt-4 */
          background-color: #1d4ed8; /* bg-blue-700 */
          border-radius: 0.5rem; /* rounded-lg */
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06); /* shadow-inner */
          padding: 0.5rem 0; /* py-2 */
        }

        .nav-menu-mobile .nav-link {
          display: block;
          padding: 0.75rem 1rem; /* px-4 py-3 */
          font-size: 1.125rem; /* text-lg */
          font-weight: 500; /* font-medium */
          transition: background-color 0.3s ease;
          border-radius: 0.375rem; /* rounded-md */
          margin: 0.25rem 0.5rem; /* mx-2 my-1 */
        }

        .nav-menu-mobile .nav-link:hover {
          background-color: #2563eb; /* hover:bg-blue-600 */
        }

        .nav-menu-mobile .nav-link.active {
          background-color: #1e40af; /* bg-blue-800 */
          color: white;
        }

        /* Media query for medium screens (md: breakpoint equivalent) */
        @media (min-width: 768px) {
          .menu-button {
            display: none; /* hidden on md and up */
          }
          .nav-links-desktop {
            display: flex; /* flex on md and up */
          }
          .nav-menu-mobile {
            display: none; /* hidden on md and up */
          }
        }
      `}</style>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo or Brand Name */}
          <a href="#" className="navbar-brand">
            MySite
          </a>

          {/* Mobile menu button */}
          <button
            className="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation links */}
          <div className="nav-links-desktop">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`} // Use href for accessibility and fallback
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor link behavior
                  scrollToSection(link.id);
                }}
                className={`nav-link ${
                  activeSection === link.id ? "active" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile navigation menu (conditionally rendered) */}
        {isMenuOpen && (
          <div className="nav-menu-mobile">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className={`nav-link ${
                  activeSection === link.id ? "active" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
