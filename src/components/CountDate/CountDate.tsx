import React, { useState, useEffect } from 'react';
import styles from './CountDate.module.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountDate: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set tanggal pernikahan (ganti sesuai tanggal aktual)
  const weddingDate = new Date('2025-08-10T09:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Hari', unit: 'Days' },
    { value: timeLeft.hours, label: 'Jam', unit: 'Hours' },
    { value: timeLeft.minutes, label: 'Menit', unit: 'Minutes' },
    { value: timeLeft.seconds, label: 'Detik', unit: 'Seconds' }
  ];

  return (
    <section className={styles.countdownSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Count the Date</h2>
          <p className={styles.subtitle}>Countdown to our special day</p>
          <div className={styles.ornament}>
            <span className={styles.decorativeElement}>❀</span>
            <span className={styles.decorativeLine}></span>
            <span className={styles.decorativeElement}>❀</span>
          </div>
        </div>

        <div className={styles.contentContainer}>

          <div className={styles.countdown}>
            {timeUnits.map((unit, index) => (
              <div key={index} className={styles.timeUnit}>
                <div className={styles.timeCard}>
                  <div className={styles.timeValue}>
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className={styles.timeLabel}>
                    <span className={styles.labelPrimary}>{unit.label}</span>
                    <span className={styles.labelSecondary}>{unit.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div className={styles.message}>
            <p className={styles.messageText}>
              "Two hearts, one soul, forever together"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountDate;