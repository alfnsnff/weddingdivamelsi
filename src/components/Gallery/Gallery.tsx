import React from "react";
import styles from "./Gallery.module.css";

// Definisikan tipe untuk gambar, termasuk ukuran
interface Image {
  src: string;
  size: 'regular' | 'wide' | 'tall'; // Ukuran yang lebih deskriptif
}

const Gallery: React.FC = () => {
  // Perbarui array gambar dengan informasi ukuran
  // Anda bisa bereksperimen dengan kombinasi ini
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

      {/* Dekorasi bunga di atas kiri */}
      <img
        src="/images/flower-decoration.png"
        alt="Dekorasi Bunga"
        className={`${styles.flowerDecoration} ${styles.topLeftDecoration}`}
      />

      {/* Dekorasi bunga di atas kanan */}
      <img
        src="/images/flower-decoration.png"
        alt="Dekorasi Bunga"
        className={`${styles.flowerDecoration} ${styles.topRightDecoration}`}
      />

      {/* Dekorasi bunga di bawah kiri */}
      <div className={styles.bottomMidDecoration}></div>


      <div className={styles.contentWrapper}>

        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Our Gallery</h2>
          <p className={styles.subtitle}>Beautiful moments captured in time</p>
          <div className={styles.ornament}>
            <span className={styles.decorativeElement}>❀</span>
            <span className={styles.decorativeLine}></span>
            <span className={styles.decorativeElement}>❀</span>
          </div>
        </div>


        <div className={styles.contentContainer}>
          <div className={styles.gallery}>
            {images.map((image, index) => (
              <div
                key={index}
                // Terapkan kelas ukuran secara dinamis
                className={`${styles.galleryItem} ${styles[image.size]}`}
              >
                <div className={styles.imageContainer}>
                  <img src={image.src} alt={`Gallery image ${index + 1}`} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
