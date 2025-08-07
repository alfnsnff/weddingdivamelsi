import { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero/Hero';
import CoupleStory from '../components/CoupleStory/CoupleStory';
import Quotes from '../components/Quotes/Quotes';
import WeddingDetails from '../components/WeddingDetails/WeddingDetails';
import MusicButton from '../components/FAB/MusicButton';
import Gallery from '../components/Gallery/Gallery';
import Comments from '../components/Comments/Comments';
import CountDate from '../components/CountDate/CountDate';
import styles from './Home.module.css';
import Thanks from '../components/Thanks/Thanks';
import Header from '../components/Header/Header';

const Home = () => {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const quotesRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null); // 1. Ref untuk elemen audio

  // Efek ini berjalan sekali saat komponen dimuat (termasuk saat refresh)
  // untuk mereset posisi scroll ke atas.
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // Efek ini mengelola penguncian scroll berdasarkan state undangan.
  useEffect(() => {
    // Terapkan atau hapus kelas no-scroll berdasarkan state
    if (!isInvitationOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    // Fungsi cleanup untuk memastikan kelas dihapus saat komponen unmount
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isInvitationOpen]);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);

    // 2. Putar musik saat undangan dibuka
    // Browser modern mungkin memerlukan interaksi pengguna untuk memutar audio,
    // mengklik tombol ini sudah termasuk interaksi.
    audioRef.current?.play().catch(error => {
      // Menangani error jika autoplay diblokir
      console.log("Autoplay was prevented:", error);
    });

    setIsPlaying(true);

    // Scroll ke bagian Quotes setelah state diperbarui
    setTimeout(() => {
      quotesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // 3. Fungsi untuk toggle musik
  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.home}>
      <Header />

      {/* 3. Tambahkan elemen audio, pastikan path-nya benar */}
      {/* Ganti 'your-song.mp3' dengan nama file musik Anda */}
      <audio ref={audioRef} src="/music/main.mp3" loop />

      <div id="hero">
        <Hero onOpenInvitation={handleOpenInvitation} isInvitationOpen={isInvitationOpen} />
      </div>

      {/* 4. Tampilkan tombol hanya jika undangan sudah dibuka */}
      {isInvitationOpen && <MusicButton isPlaying={isPlaying} onToggle={toggleMusic} />}

      <div ref={quotesRef}>
        <Quotes />
      </div>

      {/* 2. Tambahkan ID ke semua section lainnya */}
      <div id="couple-story">
        <CoupleStory />
      </div>

      <CountDate />

      <div id="wedding-details">
        <WeddingDetails />
      </div>

      <div id="gallery">
        <Gallery />
      </div>


      <div id="comments">
        <Comments />
      </div>

      <Thanks />
    </div>
  );
};

export default Home;