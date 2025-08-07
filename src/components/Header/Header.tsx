import React, { useState } from 'react';
import styles from './Header.module.css';
// 1. Impor ikon yang akan digunakan
import { FiHome, FiBookOpen, FiCalendar, FiImage, FiMessageSquare } from 'react-icons/fi';

const Header: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };

  return (
    <>
      {/* Tombol Hamburger (tidak berubah) */}
      <button 
        className={styles.hamburgerButton} 
        onClick={toggleNav}
        aria-label="Toggle Navigation"
      >
        <div className={`${styles.hamburgerIcon} ${isNavOpen ? styles.open : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Navigasi Utama */}
      <header className={`${styles.header} ${isNavOpen ? styles.navOpen : ''}`}>
        <nav className={styles.nav}>
          <ul>
            {/* 2. Ganti teks dengan komponen ikon */}
            <li><a href="#hero" className={styles.navLink} onClick={handleLinkClick} aria-label="Home"><FiHome /></a></li>
            <li><a href="#couple-story" className={styles.navLink} onClick={handleLinkClick} aria-label="Our Story"><FiBookOpen /></a></li>
            <li><a href="#wedding-details" className={styles.navLink} onClick={handleLinkClick} aria-label="Details"><FiCalendar /></a></li>
            <li><a href="#gallery" className={styles.navLink} onClick={handleLinkClick} aria-label="Gallery"><FiImage /></a></li>
            <li><a href="#comments" className={styles.navLink} onClick={handleLinkClick} aria-label="Wishes"><FiMessageSquare /></a></li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;