import React, { useEffect, useRef } from 'react';
import styles from './CountDate.module.css';
import CountDownTimer from './CountDownTimer'

const CountDate: React.FC = () => {
  const animatedItemsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animateItem);
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Turunkan threshold agar lebih mudah terpicu
      }
    );

    const currentItems = animatedItemsRef.current;
    currentItems.forEach(item => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      currentItems.forEach(item => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <section className={styles.countdownSection}>
      <div className={styles.container}>
        <div 
          className={styles.sectionHeader}
          ref={(el) => { animatedItemsRef.current[0] = el; }}
        >
          <h2 className={styles.title}>Menuju Hari Bahagia</h2>
          <p className={styles.subtitle}>Hitung mundur menuju hari istimewa kami</p>
          <div className={styles.ornament}>
            <span className={styles.decorativeElement}>❀</span>
            <span className={styles.decorativeLine}></span>
            <span className={styles.decorativeElement}>❀</span>
          </div>
        </div>

        <div className={styles.timersContainer}>
          {/* PERBAIKAN: Hapus div pembungkus dan teruskan ref langsung */}
          <CountDownTimer
            ref={(el) => { animatedItemsRef.current[1] = el; }}
            title="Resepsi Mempelai Wanita"
            targetDate="2025-08-10T18:30:00"
          />
          <CountDownTimer
            ref={(el) => { animatedItemsRef.current[2] = el; }}
            title="Resepsi Mempelai Pria"
            targetDate="2025-08-17T18:30:00"
          />
        </div>

        <div 
          className={styles.message}
          ref={(el) => { animatedItemsRef.current[3] = el; }}
        >
          <p className={styles.messageText}>
            "Two hearts, one soul, forever together"
          </p>
        </div>
      </div>
    </section>
  );
};

export default CountDate;