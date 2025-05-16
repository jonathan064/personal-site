import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className="navbar__logo">MyApp</div>
      <ul className="navbar__links">
        <li className="navbar__link">Home</li>
        <li className="navbar__link">About</li>
        <li className="navbar__link">Contact</li>
      </ul>
    </nav>
  );
}
