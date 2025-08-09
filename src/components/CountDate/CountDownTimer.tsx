import { useState, useEffect, forwardRef } from 'react';
import styles from './CountDate.module.css';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
}

interface CountDownTimerProps {
    targetDate: string;
    title: string;
}

// Gunakan forwardRef untuk menerima ref dari parent
const CountDownTimer = forwardRef<HTMLDivElement, CountDownTimerProps>(({ targetDate, title }, ref) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
    });

    const eventDate = new Date(targetDate).getTime();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = eventDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                setTimeLeft({ days, hours, minutes });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0 });
                clearInterval(timer);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [eventDate]);

    const timeUnits = [
        { value: timeLeft.days, label: 'Hari', unit: 'Days' },
        { value: timeLeft.hours, label: 'Jam', unit: 'Hours' },
        { value: timeLeft.minutes, label: 'Menit', unit: 'Minutes' },
    ];

    return (
        // Terapkan ref yang diterima ke elemen div terluar
        <div className={styles.timerInstance} ref={ref}>
            <h2 className={styles.timerTitle}>{title}</h2>
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
});

export default CountDownTimer;