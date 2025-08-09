import React, { useEffect, useRef } from 'react';
import styles from './CoupleStory.module.css';

const CoupleStory: React.FC = () => {
  // Satu ref untuk menampung semua elemen yang akan dianimasikan
  const animatedItemsRef = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const animationType = target.dataset.animationType;

            // Terapkan kelas animasi yang sesuai
            if (animationType === 'flower') {
              target.classList.add(styles.animateFlower);
            } else if (animationType === 'story') {
              target.classList.add(styles.animateStory);
            }
            
            // Berhenti mengamati elemen setelah animasi dipicu
            obs.unobserve(target);
          }
        });
      },
      {
        threshold: 0.2, // Picu saat 20% dari elemen terlihat
      }
    );

    animatedItemsRef.current.forEach(item => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      animatedItemsRef.current.forEach(item => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <div className={styles.storySection}>
      {/* Dekorasi bunga dengan ref dan data-attribute */}
      <img
        ref={(el) => { animatedItemsRef.current[0] = el; }}
        data-animation-type="flower"
        src="/images/flower-decoration-1a.png"
        alt="Dekorasi Bunga"
        className={`${styles.flowerDecoration} ${styles.topLeftDecoration}`}
      />
      <img
        ref={(el) => { animatedItemsRef.current[1] = el; }}
        data-animation-type="flower"
        src="/images/flower-decoration-1a.png"
        alt="Dekorasi Bunga"
        className={`${styles.flowerDecoration} ${styles.topRightDecoration}`}
      />
      <img
        ref={(el) => { animatedItemsRef.current[2] = el; }}
        data-animation-type="flower"
        src="/images/flower-decoration-1b.png"
        alt="Dekorasi Bunga"
        className={`${styles.flowerDecoration} ${styles.bottomLeftDecoration}`}
      />
      <img
        ref={(el) => { animatedItemsRef.current[3] = el; }}
        data-animation-type="flower"
        src="/images/flower-decoration-1b.png"
        alt="Dekorasi Bunga"
        className={`${styles.flowerDecoration} ${styles.bottomRightDecoration}`}
      />

      <div className={styles.contentWrapper}>
        {/* PERBAIKAN: Tambahkan ref dan data-attribute ke header */}
        <div 
          className={styles.sectionHeader}
          ref={(el) => { animatedItemsRef.current[4] = el; }}
          data-animation-type="story"
        >
          <h2 className={styles.title}>We're Getting Married</h2>
          <p className={styles.subtitle}>Let us present</p>
          <div className={styles.ornament}>
            <span className={styles.decorativeElement}>❀</span>
            <span className={styles.decorativeLine}></span>
            <span className={styles.decorativeElement}>❀</span>
          </div>
        </div>

        {/* Konten pasangan 1 dengan ref dan data-attribute */}
        <div 
          ref={(el) => { animatedItemsRef.current[5] = el; }}
          data-animation-type="story"
          className={styles.contentContainer}
        >
          <div className={styles.imageContainer}>
            <img src="/images/image1.jpg" alt="Diva Alkinzi" className={styles.storyImage} />
          </div>
          <div className={styles.textContainerfirst}>
            <h3 className={styles.storyTitle}>Diva Alkinzi, S.H.</h3>
            <p className={styles.storyText}>
              Putra dari Bapak Rafli, S.H. dan Ibu Asyifni, S.Pd.
            </p>
          </div>
        </div>

        {/* Konten pasangan 2 dengan ref dan data-attribute */}
        <div 
          ref={(el) => { animatedItemsRef.current[6] = el; }}
          data-animation-type="story"
          className={styles.contentContainer}
        >
          <div className={styles.imageContainer}>
            <img src="/images/image1.jpg" alt="Melsi Agustia" className={styles.storyImage} />
          </div>
          <div className={styles.textContainersecond}>
            <h3 className={styles.storyTitle}>Melsi Agustia Zulasma, S.Pd, M.Si.</h3>
            <p className={styles.storyText}>
              Putri dari Bapak Alm. Zulman, S.Sos. & Ibu Asmaidar, S.Pd.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoupleStory;