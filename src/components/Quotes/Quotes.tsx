import React, { useState, useEffect, useRef } from 'react';
import styles from './Quotes.module.css';

const Quotes: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Jika elemen masuk ke viewport
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Hentikan pengamatan setelah animasi dipicu sekali
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        // Animasi akan terpicu saat 20% dari elemen terlihat
        threshold: 0.6,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer saat komponen dibongkar
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []); // Array kosong memastikan efek ini hanya berjalan sekali saat komponen dimuat

  return (
    <section 
      ref={sectionRef} 
      className={`${styles.quotesSection} ${isVisible ? styles.animate : ''}`}
    >
      <div className={styles.imageContainer}>
        <img src="/images/image1.jpg" alt="How we met" className={styles.quotesImage} />
        {/* <img src="/images/image1.jpg" alt="How we met" className={styles.quotesImage} /> */}
      </div>
      <div className={styles.textContainer}>
        <h4 className={styles.quotesTitle}>-Q.S. Ar-Rum: 21-</h4>
        <p className={styles.quotesText}>Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang</p>
      </div>
    </section>
  );
};

export default Quotes;