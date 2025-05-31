"use client";
import React from "react";
import Section from "./components/section/section";
import Navbar from "./components/navbar/navbar";
// Define the type for the functional component for better type checking
const App: React.FC = () => {
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about-us", label: "About Us" },
    { id: "our-services", label: "Services" },
    { id: "contact-info", label: "Contact" }
  ];
  return (
    <div>
      {/* Global styles for the body to ensure smooth scrolling and font */}
      <style jsx global>{`
        body {
          margin: 0;
          font-family: "Inter", sans-serif; /* Using Inter font as per instructions */
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          scroll-behavior: smooth; /* Enable smooth scrolling for anchor links */
        }
      `}</style>
      <Navbar links={navLinks} />
      {/* Example Section 1: Home */}
      <Section
        id="home"
        title="Welcome to Our Website!"
        paragraph="This is the introductory section of our beautiful website, designed to showcase our services and products."
      />

      {/* Example Section 2: About Us */}
      <Section
        id="about-us"
        title="About Our Company"
        paragraph="Learn more about our mission, vision, and the dedicated team behind our success. We are passionate about what we do."
      />

      {/* Example Section 3: Services */}
      <Section
        id="our-services"
        title="What We Offer"
        paragraph="Explore a comprehensive range of services tailored to meet your specific needs and exceed your expectations."
      />

      {/* Example Section 4: Contact */}
      <Section
        id="contact-info"
        title="Get in Touch With Us"
        paragraph="Have questions or need support? Our friendly team is ready to assist you. Reach out today!"
      />
    </div>
  );
};

export default App;
