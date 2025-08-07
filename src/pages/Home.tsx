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
  const audioRef = useRef<HTMLAudioElement>(null);
  const wasPlayingRef = useRef(false);

  // Efek untuk mereset posisi scroll ke atas saat refresh
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  // Efek untuk mengunci scroll saat undangan belum dibuka
  useEffect(() => {
    if (!isInvitationOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // Cleanup
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isInvitationOpen]);

  // Efek untuk menjeda/melanjutkan musik saat tab browser tidak aktif
  useEffect(() => {
    const handleVisibilityChange = () => {
      // Jika halaman disembunyikan
      if (document.hidden) {
        // Ingat apakah musik sedang berputar, lalu jeda
        if (isPlaying) {
          wasPlayingRef.current = true;
          audioRef.current?.pause();
          setIsPlaying(false);
        }
      } 
      // Jika halaman ditampilkan kembali
      else {
        // Jika sebelumnya musik berputar, putar kembali
        if (wasPlayingRef.current) {
          audioRef.current?.play();
          setIsPlaying(true);
          wasPlayingRef.current = false; // Reset ref
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying]);

  // Fungsi saat tombol "Buka Undangan" ditekan
  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    audioRef.current?.play().catch(error => {
      console.log("Autoplay was prevented:", error);
    });
    setIsPlaying(true);

    setTimeout(() => {
      quotesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Fungsi untuk toggle tombol musik
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
      {isInvitationOpen && <Header />}

      <audio ref={audioRef} src="/music/main.mp3" loop />

      <div id="hero">
        <Hero onOpenInvitation={handleOpenInvitation} isInvitationOpen={isInvitationOpen} />
      </div>

      {isInvitationOpen && <MusicButton isPlaying={isPlaying} onToggle={toggleMusic} />}

      <div ref={quotesRef}>
        <Quotes />
      </div>

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