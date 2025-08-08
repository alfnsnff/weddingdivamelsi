import React, { useState, useEffect } from 'react';
import styles from './CountDate.module.css';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

// Definisikan props yang akan diterima komponen ini
interface CountDownTimerProps {
    targetDate: string; // Tanggal acara dalam format string
    title: string;      // Judul acara, misal "Akad Nikah"
}

const CountDownTimer: React.FC<CountDownTimerProps> = ({ targetDate, title }) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Gunakan prop 'targetDate' untuk perhitungan
    const eventDate = new Date(targetDate).getTime();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = eventDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [eventDate]);

    const timeUnits = [
    { value: timeLeft.days, label: 'Hari', unit: 'Days' },
    { value: timeLeft.hours, label: 'Jam', unit: 'Hours' },
    { value: timeLeft.minutes, label: 'Menit', unit: 'Minutes' },
    { value: timeLeft.seconds, label: 'Detik', unit: 'Seconds' }
    ];

    return (
        <div className={styles.timerInstance}>
            <h3 className={styles.timerTitle}>{title}</h3>
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
        </div>
    );
};

export default CountDownTimer;