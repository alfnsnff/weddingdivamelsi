import React, { useEffect, useRef } from 'react';
import styles from './WeddingDetails.module.css';

const WeddingDetails: React.FC = () => {
  const animatedItemsRef = useRef<Array<HTMLDivElement | null>>([]);

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
        threshold: 0.65, // Picu saat 20% elemen terlihat
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
    <section className={styles.weddingDetails}>
      {/* PERBAIKAN: Tambahkan ref ke header */}
      <div 
        className={styles.sectionHeader}
        ref={(el) => { animatedItemsRef.current[0] = el; }}
      >
        <h2 className={styles.title}>Wedding Details</h2>
        <p className={styles.subtitle}>Join us in celebrating our special day</p>
        <div className={styles.ornament}>
          <span className={styles.decorativeElement}>❀</span>
          <span className={styles.decorativeLine}></span>
          <span className={styles.decorativeElement}>❀</span>
        </div>
      </div>

      <div className={styles.contentContainer}>
        {/* Akad Nikah */}
        <div 
          className={styles.eventCard}
          // PERBAIKAN: Sesuaikan indeks ref
          ref={(el) => { animatedItemsRef.current[1] = el; }}
        >
          <h2 className={styles.eventTitle}>Akad Nikah</h2>
          <div className={styles.eventInfo}>
            <div className={styles.bigDateContainer}>
              <span className={styles.dayText}>SABTU</span>
              <div className={styles.divider}></div>
              <div className={styles.bigDate}>
                <span className={styles.month}>Agustus</span>
                <span className={styles.dateNumber}>11</span>
                <span className={styles.year}>2030</span>
              </div>
              <div className={styles.divider}></div>
              <span className={styles.timeRange}>14.00 S/D<br />18.00 WIB</span>
            </div>
          </div>
          <div className={styles.venueInfo}>
            <p className={styles.venue}>Jln. Tgk. Mhd. Abduh Syam, Desa Jamboepapeun, Kec. Meukek, Kab Aceh Selatan</p>
          </div>
        </div>

        {/* Resepsi Mempelai Wanita */}
        <div 
          className={styles.eventCard}
          // PERBAIKAN: Sesuaikan indeks ref
          ref={(el) => { animatedItemsRef.current[2] = el; }}
        >
          <h2 className={styles.eventTitle}>Resepsi Mempelai Wanita</h2>
          <div className={styles.eventInfo}>
            <div className={styles.bigDateContainer}>
              <span className={styles.dayText}>SABTU</span>
              <div className={styles.divider}></div>
              <div className={styles.bigDate}>
                <span className={styles.month}>Agustus</span>
                <span className={styles.dateNumber}>11</span>
                <span className={styles.year}>2030</span>
              </div>
              <div className={styles.divider}></div>
              <span className={styles.timeRange}>14.00 S/D<br />18.00 WIB</span>
            </div>
          </div>
          <div className={styles.venueInfo}>
            <p className={styles.venue}>Jln. Tgk. Mhd. Abduh Syam, Desa Jamboepapeun, Kec. Meukek, Kab Aceh Selatan</p>
          </div>
        </div>

        {/* Resepsi Mempelai Pria */}
        <div 
          className={styles.eventCard}
          // PERBAIKAN: Sesuaikan indeks ref
          ref={(el) => { animatedItemsRef.current[3] = el; }}
        >
          <h2 className={styles.eventTitle}>Resepsi Mempelai Pria</h2>
          <div className={styles.eventInfo}>
            <div className={styles.bigDateContainer}>
              <span className={styles.dayText}>SABTU</span>
              <div className={styles.divider}></div>
              <div className={styles.bigDate}>
                <span className={styles.month}>Agustus</span>
                <span className={styles.dateNumber}>11</span>
                <span className={styles.year}>2030</span>
              </div>
              <div className={styles.divider}></div>
              <span className={styles.timeRange}>14.00 S/D<br />18.00 WIB</span>
            </div>
          </div>
          <div className={styles.venueInfo}>
            <p className={styles.venue}>Jln. Pramuka, No.113, Desa Ie Dingen Kecamatan Meukek, Kabupaten Aceh Selatan</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;