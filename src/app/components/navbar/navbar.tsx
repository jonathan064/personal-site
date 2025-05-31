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
            rgba(8, 8, 8, 0),
            rgb(42, 40, 45)
          ); /* from-blue-600 to-purple-700 */
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-lg */
          z-index: 50;
          padding: 1rem; /* p-4 */
          font-family: "Inter", sans-serif;
        }

        .navbar-container {
          max-width: mx-auto;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          font-size: 1.5rem; /* text-2xl */
          font-weight: bold;
          color: black;
          border-radius: 0.375rem; /* rounded-md */
          padding: 0.5rem 0.75rem; /* px-3 py-2 */
          transition: background-color 0.3s ease;
        }

        .navbar-brand:hover {
          background-color: rgb(255, 255, 255); /* hover:bg-blue-700 */
        }

        .menu-button:focus {
          box-shadow: 0 0 0 2px white; /* focus:ring-2 focus:ring-white */
        }

        /* Desktop navigation links */
        .nav-links-desktop {
          display: none; /* hidden by default */
          gap: 1.5rem; /* space-x-6 */
        }

        .nav-link {
          padding: 0.5rem 6rem; /* px-4 py-2 */
          border-radius: 0.375rem; /* rounded-md */
          font-size: 1.126rem; /* text-lg */
          font-weight: 500; /* font-medium */
          color: white;
          transition: background-color 0.3s ease, color 0.3s ease,
            box-shadow 0.3s ease;
        }

        .nav-link:hover {
          background-color: rgb(70, 105, 151); /* hover:bg-blue-500 */
          color: white;
        }

        .nav-link.active {
          background-color: #1d4ed8; /* bg-blue-700 */
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-md */
        }

        /* Media query for medium screens (md: breakpoint equivalent) */
        @media (min-width: 768px) {
          .nav-links-desktop {
            display: flex; /* flex on md and up */
          }
        }
      `}</style>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo or Brand Name */}
          <a href="#" className="navbar-brand">
            Home
          </a>

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
      </nav>
    </>
  );
};

export default Navbar;
