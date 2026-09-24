import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/assets/media/slide_1.JPG',
  '/assets/media/slide_2.JPG',
  '/assets/media/slide_3.JPG',
  '/assets/media/slide_4.JPG',
  '/assets/media/slide_5.JPG',
  '/assets/media/slide_6.jpg'
];

const SlideshowSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="section" style={{ minHeight: '60vh' }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
          >
            <img 
              src={images[currentIndex]} 
              alt={`Slide ${currentIndex + 1}`} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dots */}
        <div style={{ position: 'absolute', bottom: '15px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 10 }}>
          {images.map((_, i) => (
            <div 
              key={i} 
              style={{ 
                width: '8px', height: '8px', borderRadius: '50%', 
                backgroundColor: i === currentIndex ? 'white' : 'rgba(255,255,255,0.4)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideshowSection;
