import React, { useState, useEffect, useRef } from 'react';
import styles from './Thanks.module.css';

const Thanks: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        threshold: 0.65, // Picu animasi saat 25% section terlihat
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`${styles.thanks} ${isVisible ? styles.animate : ''}`}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h2 className={styles.title}>Terima Kasih</h2>
        <p className={styles.paragraph}>
          Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, 
          berkenan hadir dan memberikan do'a restu kepada kami.
        </p>
        <p className={styles.subheading}>KAMI YANG BERBAHAGIA</p>
        <h3 className={styles.names}>Diva & Melsi</h3>
      </div>
    </section>
  );
};

export default Thanks;