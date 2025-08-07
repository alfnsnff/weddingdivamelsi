import React from 'react';
import styles from './Thanks.module.css';

const Thanks: React.FC = () => {
  return (
    <section className={styles.thanks}>
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