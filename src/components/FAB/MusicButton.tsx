import React from 'react';
import styles from './MusicButton.module.css';

interface MusicButtonProps {
    isPlaying: boolean;
    onToggle: () => void;
}

const MusicButton: React.FC<MusicButtonProps> = ({ isPlaying, onToggle }) => {
    return (
        <button className={styles.musicButton} onClick={onToggle} aria-label="Toggle Music">
            {/* Ganti <img> dengan kode SVG inline */}
            <svg
                // Terapkan kelas animasi di sini
                className={`${styles.icon} ${isPlaying ? styles.spinning : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                // Anda bisa mengatur warna langsung di sini atau menggunakan 'currentColor'
                fill="white"
            >
                <path d="M12,15a3,3,0,1,0-3-3H9A3,3,0,0,0,12,15ZM12,.5A11.89,11.89,0,0,0,8.87.92a.5.5,0,0,0-.37.48V6.49a.5.5,0,0,0,.73.44A5.93,5.93,0,0,1,12,6.25a5.75,5.75,0,0,1,0,11.5A5.54,5.54,0,0,1,6.5,12V2.94a.5.5,0,0,0-.78-.41A11.63,11.63,0,0,0,.5,12,11.5,11.5,0,1,0,12,.5Z" />
            </svg>
        </button>
    );
};

export default MusicButton;