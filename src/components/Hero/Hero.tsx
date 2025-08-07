import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';

// Definisikan tipe untuk props
interface HeroProps {
  onOpenInvitation: () => void;
  isInvitationOpen: boolean;
}

const Hero: React.FC<HeroProps> = ({ onOpenInvitation, isInvitationOpen }) => {
  const [guestName, setGuestName] = useState('Bapak/Ibu/Saudara/i'); // Default name

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const to = urlParams.get('to');
    if (to) {
      setGuestName(to.replace(/_/g, ' ')); // Ganti underscore dengan spasi jika perlu
    }
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <div className={styles.contentContainer}>
          <p className={styles.preTitle}>The Wedding Of</p>
          <h1 className={styles.coupleNames}>
            {"Diva & Melsi".split(' ').map((word, index) => (
              <span key={index}>{word}</span>
            ))}
          </h1>
          <p className={styles.weddingDate}>07.07.2025</p>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.invitation}>
            <p className={styles.kepada}>Kepada Yth:</p>
            <p className={styles.guestName}>{guestName}</p>
            <p className={styles.location}>Di Tempat</p>
          </div>
          <button
            className={`${styles.openButton} ${isInvitationOpen ? styles.hidden : ''}`}
            onClick={onOpenInvitation}
          >
            Buka Undangan
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;