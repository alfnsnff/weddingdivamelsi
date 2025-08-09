import React, { useEffect, useRef } from "react";
import styles from "./Gallery.module.css";

// Definisikan tipe untuk gambar, termasuk ukuran
interface Image {
  src: string;
  size: 'regular' | 'wide' | 'tall'; // Ukuran yang lebih deskriptif
}

const Gallery: React.FC = () => {
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
            if (animationType === 'flower-corner') {
              target.classList.add(styles.animateFlowerCorner);
            } else if (animationType === 'flower-bottom') {
              target.classList.add(styles.animateFlowerBottom);
            } else if (animationType === 'gallery-item') {
              target.classList.add(styles.animateItem);
            }
            
            // Berhenti mengamati elemen setelah animasi dipicu
            obs.unobserve(target);
          }
        });
      },
      {
        threshold: 0.1, // Picu saat 10% dari elemen terlihat
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

  const images: Image[] = [
    { src: "/images/gallery-1.JPG", size: 'tall' },
    { src: "/images/gallery-2.JPG", size: 'wide' },
    { src: "/images/gallery-3.JPG", size: 'regular' },
    { src: "/images/gallery-4.png", size: 'regular' },
    { src: "/images/gallery-5.jpg", size: 'regular' },
    { src: "/images/gallery-6.jpg", size: 'tall' },
    { src: "/images/gallery-7.png", size: 'wide' },
    { src: "/images/gallery-8.jpg", size: 'wide' },
    { src: "/images/gallery-9.jpg", size: 'regular' },
    { src: "/images/gallery-10.png", size: 'regular' },
    { src: "/images/gallery-11.png", size: 'regular' },
  ];

  return (
    <section className={styles.gallerySection}>
      {/* Dekorasi bunga dengan ref dan data-attribute */}
      <img
        ref={(el) => { animatedItemsRef.current[0] = el as HTMLImageElement; }}
        data-animation-type="flower-corner"
        src="/images/flower-decoration-1a.png"
        alt="Dekorasi Bunga"
        className={`${styles.flowerDecoration} ${styles.topLeftDecoration}`}
      />
      <img
        ref={(el) => { animatedItemsRef.current[1] = el as HTMLImageElement; }}
        data-animation-type="flower-corner"
        src="/images/flower-decoration-1a.png"
        alt="Dekorasi Bunga"
        className={`${styles.flowerDecoration} ${styles.topRightDecoration}`}
      />
      <div 
        ref={(el) => { animatedItemsRef.current[2] = el as HTMLDivElement; }}
        data-animation-type="flower-bottom"
        className={styles.bottomMidDecoration}
      ></div>

      <div className={styles.contentWrapper}>
        {/* PERBAIKAN: Tambahkan ref dan data-attribute ke header */}
        <div 
          className={styles.sectionHeader}
          ref={(el) => { animatedItemsRef.current[3] = el as HTMLDivElement; }}
          data-animation-type="gallery-item"
        >
          <h2 className={styles.title}>Our Gallery</h2>
          <p className={styles.subtitle}>Beautiful moments captured in time</p>
          <div className={styles.ornament}>
            <span className={styles.decorativeElement}>❀</span>
            <span className={styles.decorativeLine}></span>
            <span className={styles.decorativeElement}>❀</span>
          </div>
        </div>

        <div className={styles.gallery}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.galleryItem} ${styles[image.size]}`}
              // PERBAIKAN: Sesuaikan indeks ref
              ref={(el) => { animatedItemsRef.current[index + 4] = el as HTMLDivElement; }}
              data-animation-type="gallery-item"
            >
              <div className={styles.imageContainer}>
                <img src={image.src} alt={`Gallery image ${index + 1}`} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
