'use client';

import { useState, useEffect } from 'react';

const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Set target date to 30 days from now for demo purposes
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 30); 
        const targetTime = targetDate.getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetTime - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="countdown">
            <div className="unit">
                <span className="number">{timeLeft.days}</span>
                <span className="label">Days</span>
            </div>
            <div className="unit">
                <span className="number">{timeLeft.hours}</span>
                <span className="label">Hours</span>
            </div>
            <div className="unit">
                <span className="number">{timeLeft.minutes}</span>
                <span className="label">Minutes</span>
            </div>
            <div className="unit">
                <span className="number">{timeLeft.seconds}</span>
                <span className="label">Seconds</span>
            </div>
        </div>
    );
};

export default Countdown;
