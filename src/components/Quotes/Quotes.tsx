import React from 'react';
import styles from './Quotes.module.css';

const Quotes: React.FC = () => {
  return (
    <section className={styles.quotesSection}>

      
      <div className={styles.imageContainer}>
        <img src="/images/image1.jpg" alt="How we met" className={styles.quotesImage} />
        {/* <img src="/images/image1.jpg" alt="How we met" className={styles.quotesImage} /> */}
      </div>
      <div className={styles.textContainer}>
        <h4 className={styles.quotesTitle}>-Q.S. Ar-Rum: 21-</h4>
        <p className={styles.quotesText}>Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang</p>
      </div>
    </section>
  );
};

export default Quotes;