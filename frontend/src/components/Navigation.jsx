import styles from './Navigation.module.css';
import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <a href="/" className={styles.brand}>
          Hanik <span>Lakhe</span>
        </a>

        <ul className={styles.links}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#publications">Publications</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <a href="#contact" className={styles.cta}>Contact Me</a>

        <button 
          className={styles.burger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={styles.drawer}>
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
          <a href="#publications" onClick={() => setMobileMenuOpen(false)}>Publications</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
}
