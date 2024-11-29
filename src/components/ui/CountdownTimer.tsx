// src/components/ui/CountdownTimer.tsx
import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
 
  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const targetDate = new Date('2024-12-07T23:59:59');
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
 
      if (difference <= 0) {
        return {
          days: 0,
          hours: 0, 
          minutes: 0,
          seconds: 0
        };
      }
 
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    };
 
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
 
    return () => clearInterval(timer);
  }, []);
 
  if (!mounted) return null;
 
  return (
    <div className="flex gap-4 justify-center">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 w-20">
            <div className="text-3xl font-bold text-white">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-xs text-white/60 uppercase">{unit}</div>
          </div>
        </div>
      ))}
    </div>
  );
 }