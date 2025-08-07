import React from 'react';
import styles from './CoupleStory.module.css';

const CoupleStory: React.FC = () => {
  return (
    <div className={styles.storySection}>
      {/* Dekorasi bunga di atas kiri */}
      <img
        src="/images/flower-decoration-1.png"
        alt="Dekorasi Bunga"
        className={`${styles.flowerDecoration} ${styles.topLeftDecoration}`}
      />

      {/* Dekorasi bunga di atas kanan */}
      <img
        src="/images/flower-decoration-1.png"
        alt="Dekorasi Bunga"
        className={`${styles.flowerDecoration} ${styles.topRightDecoration}`}
      />

      {/* Dekorasi bunga di bawah kiri */}
      <img
        src="/images/flower-decoration-1.png"
        alt="Dekorasi Bunga"
        className={`${styles.flowerDecoration} ${styles.bottomLeftDecoration}`}
      />

      {/* Dekorasi bunga di bawah kanan */}
      <img
        src="/images/flower-decoration-1.png"
        alt="Dekorasi Bunga"
        className={`${styles.flowerDecoration} ${styles.bottomRightDecoration}`}
      />

      {/* Konten utama */}
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>We're Getting Married</h2>
          <p className={styles.subtitle}>Let us present</p>
          <div className={styles.ornament}>
            <span className={styles.decorativeElement}>❀</span>
            <span className={styles.decorativeLine}></span>
            <span className={styles.decorativeElement}>❀</span>
          </div>
        </div>

        {/* Konten pasangan */}
        <div className={styles.contentContainer}>
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

        <div className={styles.contentContainer}>
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