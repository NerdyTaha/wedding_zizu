import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import WelcomeSection from './components/WelcomeSection';
import ScratchCardSection from './components/ScratchCardSection';
import SlideshowSection from './components/SlideshowSection';
import CountdownSection from './components/CountdownSection';
import VenueSection from './components/VenueSection';
import TransportationSection from './components/TransportationSection';
import GiftsSection from './components/GiftsSection';
import FooterSection from './components/FooterSection';

function App() {
  const [isMuted, setIsMuted] = useState(false);
  const [isHeroPlaying, setIsHeroPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const bgAudioRef = useRef(null);

  // Capture first user interaction to satisfy browser autoplay policies
  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  // Background audio logic
  useEffect(() => {
    if (bgAudioRef.current && hasInteracted) {
      if (!isMuted && !isHeroPlaying) {
        bgAudioRef.current.play().catch(e => console.log("Audio play blocked", e));
      } else {
        bgAudioRef.current.pause();
      }
    }
  }, [isMuted, isHeroPlaying, hasInteracted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="app-container">
      <audio ref={bgAudioRef} src="/assets/media/bg_audio.mp3" loop />
      
      <button className="mute-button" onClick={toggleMute} aria-label="Toggle sound">
        {isMuted ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
        )}
      </button>

      <HeroSection 
        isMuted={isMuted} 
        onPlayStateChange={(playing) => setIsHeroPlaying(playing)} 
      />
      
      <WelcomeSection />
      <ScratchCardSection />
      <SlideshowSection />
      <CountdownSection />
      <VenueSection />
      <TransportationSection />
      <GiftsSection />
      <FooterSection />
    </div>
  );
}

export default App;
