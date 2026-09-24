import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CountdownSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target Date: 2nd January 2027
    const targetDate = new Date("2027-01-02T00:00:00").getTime();
    
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    // Set initial value immediately
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 8px' }}>
      <div style={{ 
        backgroundColor: '#ebdcd2', 
        border: '1px solid #d3c1b6',
        borderRadius: '8px', 
        padding: '15px 12px',
        minWidth: '40px',
        fontWeight: '600',
        fontSize: '1.4rem',
        color: 'var(--text-color)',
        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5)'
      }}>
        {value.toString().padStart(2, '0')}
      </div>
      <span style={{ fontSize: '0.7rem', marginTop: '8px', color: 'var(--accent-color)', letterSpacing: '1px' }}>
        {label}
      </span>
    </div>
  );

  return (
    <motion.div 
      className="section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="cursive-title">Counting Down to Forever</h2>
      <div className="divider">♥</div>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <TimeBox value={timeLeft.days} label="DAYS" />
        <TimeBox value={timeLeft.hours} label="HOURS" />
        <TimeBox value={timeLeft.minutes} label="MINUTES" />
        <TimeBox value={timeLeft.seconds} label="SECONDS" />
      </div>
    </motion.div>
  );
};

export default CountdownSection;
