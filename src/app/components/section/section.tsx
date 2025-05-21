import React from "react";
import styles from "./section.module.css"; // Importing CSS module for styling

/**
 * Interface for Section Component Props
 * Defines the types for the properties that the Section component accepts.
 */
interface SectionProps {
  id: string; // A unique identifier for the section, used for navigation.
  title: string; // The main heading for the section.
  paragraph: string; // The main textual content of the section.
}

/**
 * Reusable Section Component
 *
 * This component creates a distinct section on a web page with a title and a paragraph.
 * It's designed to be easily customizable with props for its ID, title, paragraph content,
 * and background color.
 *
 * @param {SectionProps} props - The component's properties, typed with SectionProps.
 * @returns {JSX.Element} A React section element.
 */
const Section: React.FC<SectionProps> = ({ id, title, paragraph }) => {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.contentBox}>
        {" "}
        {/* This div now wraps both title and paragraph */}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.paragraph}>{paragraph}</p>
      </div>
    </section>
  );
};

export default Section;
