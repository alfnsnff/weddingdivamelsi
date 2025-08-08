import React from 'react';
import styles from './CountDate.module.css';
import CountdownTimer from './CountdownTimer'; // Impor komponen baru

const CountDate: React.FC = () => {
  return (
    <section className={styles.countdownSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Menuju Hari Bahagia</h2>
          <p className={styles.subtitle}>Hitung mundur menuju hari istimewa kami</p>
          <div className={styles.ornament}>
            <span className={styles.decorativeElement}>❀</span>
            <span className={styles.decorativeLine}></span>
            <span className={styles.decorativeElement}>❀</span>
          </div>
        </div>

        <div className={styles.timersContainer}>
          {/* Timer Pertama: Akad Nikah */}
          <CountdownTimer
            title="Akad Nikah"
            targetDate="2025-08-10T09:00:00"
          />

          {/* Timer Kedua: Resepsi Mempelai Wanita */}
          <CountdownTimer
            title="Resepsi Mempelai Wanita"
            targetDate="2025-08-10T18:30:00"
          />

          {/* TAMBAHKAN INI: Timer Ketiga untuk Resepsi kedua */}
          <CountdownTimer
            title="Resepsi Mempelai Pria"
            targetDate="2025-08-17T18:30:00"
          />
        </div>

        <div className={styles.message}>
          <p className={styles.messageText}>
            "Two hearts, one soul, forever together"
          </p>
        </div>
      </div>
    </section>
  );
};

export default CountDate;