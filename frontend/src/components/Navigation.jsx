import styles from './Navigation.module.css';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          Hanik <span>Lakhe</span>
        </Link>

        <ul className={styles.links}>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/experience">Experience</NavLink></li>
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><NavLink to="/publications">Publications</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>

        <Link to="/contact" className={styles.cta}>Contact Me</Link>

        <button 
          className={styles.burger}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className={styles.drawer}>
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>About</NavLink>
          <NavLink to="/experience" onClick={() => setMobileMenuOpen(false)}>Experience</NavLink>
          <NavLink to="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</NavLink>
          <NavLink to="/publications" onClick={() => setMobileMenuOpen(false)}>Publications</NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink>
        </div>
      )}
    </nav>
  );
}
