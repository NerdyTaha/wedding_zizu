import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const ScratchCardSection = () => {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Set actual size in memory to match CSS dimensions
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Fill with the rose-gold/bronze color
    ctx.fillStyle = '#C2A89D'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some noise/glitter effect to simulate a real scratch card
    for (let i = 0; i < 800; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? '#e2d1c3' : '#a3796d';
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }

    // Scratching settings
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 35;
    ctx.globalCompositeOperation = 'destination-out';

    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const startDrawing = (e) => {
      if (isRevealed) return;
      isDrawing.current = true;
      const { x, y } = getMousePos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (e) => {
      if (!isDrawing.current || isRevealed) return;
      // Prevent default to avoid scrolling on mobile while scratching
      if (e.cancelable) {
        e.preventDefault();
      }
      const { x, y } = getMousePos(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      checkReveal();
    };

    const endDrawing = () => {
      isDrawing.current = false;
    };

    // Throttle checkReveal slightly for performance
    let lastCheck = 0;
    const checkReveal = () => {
      const now = Date.now();
      if (now - lastCheck < 100) return;
      lastCheck = now;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
      }
      const percent = (transparent / (pixels.length / 4)) * 100;
      
      // If x% of the card is scratched, reveal the rest
      if (percent > 30) {
        setIsRevealed(true);
      }
    };

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw, { passive: false });
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseleave', endDrawing);

    // Touch events
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', endDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', endDrawing);
      canvas.removeEventListener('mouseleave', endDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', endDrawing);
    };
  }, [isRevealed]);

  useEffect(() => {
    if (isRevealed) {
      const duration = 2500;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 100 };

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { 
          particleCount, 
          origin: { x: Math.random() * 0.4 + 0.3, y: Math.random() * 0.2 + 0.5 },
          colors: ['#a3796d', '#C2A89D', '#e2d1c3', '#ffffff', '#e8c9b8']
        }));
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [isRevealed]);

  // A smooth heart SVG path used as a mask
  const heartMask = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")`;

  const handleSaveDate = () => {
    const event = {
      title: 'Wedding of Zishan & Zubiya',
      description: 'Join us to celebrate our wedding!',
      location: 'Kohinoor Marriage Lawn, Veera Desai road, Andheri West, Mumbai',
      // Format: YYYYMMDDTHHMMSS
      startTime: '20270102T190000', // 7:00 PM
      endTime: '20270102T233000'    // 11:30 PM
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${event.startTime}`,
      `DTEND:${event.endTime}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${event.location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'wedding_invitation.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      className="section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ padding: '60px 20px', minHeight: '60vh' }}
    >
      <h2 className="cursive-title">{isRevealed ? "Our forever begins" : "Scratch to Reveal the Date"}</h2>
      <div className="divider">♥</div>

      <div style={{
        position: 'relative',
        width: '380px',
        height: '350px',
        margin: '20px auto',
        // Apply the heart mask to create the shape
        WebkitMaskImage: heartMask,
        maskImage: heartMask,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        backgroundColor: '#FAF5F1',
        transform: 'translateX(-10px)'
      }}>
        
        {/* Content behind the scratch card */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          transform: 'translate(-17px, -20px)'
        }}>
          <p style={{ fontStyle: 'italic', color: 'var(--accent-color)', marginBottom: '5px' }}>You're Invited!</p>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: '5px 0', color: 'var(--text-color)', fontWeight: '600' }}>
            January 2, 2027
          </h3>
          <p style={{ fontSize: '1rem', margin: '2px 0', color: 'var(--accent-color)' }}>Saturday</p>
          <p style={{ fontSize: '0.8rem', margin: '5px 0', color: 'var(--text-color)', opacity: 0.8 }}>7:00 PM</p>
        </div>

        {/* The scratchable canvas layer */}
        <motion.canvas
          ref={canvasRef}
          animate={{ opacity: isRevealed ? 0 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            cursor: 'crosshair',
            pointerEvents: isRevealed ? 'none' : 'auto'
          }}
        />
      </div>

      <div style={{ minHeight: '60px', marginTop: '20px' }}>
        <AnimatePresence>
          {isRevealed && (
            <motion.button 
              onClick={handleSaveDate}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                backgroundColor: '#7A5C53',
                color: '#fff',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '24px',
                fontSize: '0.9rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(122, 92, 83, 0.3)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <line x1="12" y1="14" x2="12" y2="18"></line>
                <line x1="10" y1="16" x2="14" y2="16"></line>
              </svg>
              Save the Date
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ScratchCardSection;
