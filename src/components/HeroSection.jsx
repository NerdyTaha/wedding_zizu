import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSection = ({ isMuted, onPlayStateChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const animationAudioRef = useRef(null);
  
  // Sequence of 100 frames
  const totalFrames = 100;
  
  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentFrame((prev) => {
          if (prev >= totalFrames - 1) {
            clearInterval(intervalId);
            setIsPlaying(false);
            setHasPlayed(true);
            onPlayStateChange(false);
            return prev;
          }
          return prev + 1;
        });
      }, 100); // 10 fps, adjust based on actual images
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, onPlayStateChange]);

  // Handle animation audio
  useEffect(() => {
    if (animationAudioRef.current) {
      if (isPlaying && !isMuted) {
        animationAudioRef.current.play().catch(e => console.log("Audio block", e));
      } else {
        animationAudioRef.current.pause();
      }
    }
  }, [isPlaying, isMuted]);

  const handleTap = () => {
    if (!isPlaying && !hasPlayed) {
      setIsPlaying(true);
      onPlayStateChange(true);
    }
  };

  const currentFrameString = String(currentFrame + 1).padStart(3, '0');

  return (
    <div 
      className="hero-section" 
      style={{ 
        height: '100vh', 
        width: '100%', 
        position: 'relative', 
        cursor: (isPlaying || hasPlayed) ? 'default' : 'pointer', 
        overflow: 'hidden',
        backgroundColor: '#000'
      }}
      onClick={handleTap}
    >
      <audio ref={animationAudioRef} src="/assets/media/animation_audio.mp3" />
      
      <div 
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1
        }}
      >
        <img 
          src={`/assets/media/hero_sequence/ezgif-frame-${currentFrameString}.jpg`} 
          alt="animation frame" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>

      <div style={{ position: 'absolute', bottom: '20px', width: '100%', zIndex: 2, display: 'flex', justifyContent: 'center' }}>
        {!isPlaying && !hasPlayed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ fontSize: '2.2rem', fontStyle: 'italic', color: 'white', textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}
          >
            Tap to open
          </motion.div>
        )}

        {hasPlayed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ fontSize: '1.0rem', fontStyle: 'italic', color: 'white', textShadow: '1px 1px 4px rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            <span>Scroll</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
