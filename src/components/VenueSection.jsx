import React from 'react';
import { motion } from 'framer-motion';

const VenueSection = () => {
  // 📍 REPLACE THIS LINK WITH YOUR ACTUAL GOOGLE MAPS LINK
  const GOOGLE_MAPS_LINK = "https://www.google.com/maps/place/Kohinoor+Marriage+Lawn/@19.1376393,72.8376308,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7b7003545f96d:0xa6c942432d1de54e!8m2!3d19.1376393!4d72.8376308!16s%2Fg%2F11y8sr97vm?entry=tts&g_ep=EgoyMDI2MDkyMi4wIPu8ASoASAFQAw%3D%3D&skid=99dde49e-ddea-441f-bb2a-7390d8e47b6c";

  return (
    <motion.div 
      className="section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
      <h2 className="cursive-title">Venue</h2>
      <div className="divider">♥</div>
      
      <h3 style={{ margin: '10px 0 5px 0', fontSize: '1.4rem', fontWeight: '600' }}>Kohinoor Marriage Lawn </h3>
      <p style={{ margin: '0 0 20px 0', color: 'var(--accent-color)', fontSize: '1rem' }}>Veera Desai road, Andheri West, Mumbai</p>
      
      {/* Map Card */}
      <div style={{ 
        width: '100%', 
        maxWidth: '350px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        backgroundColor: '#e2e8f0',
        position: 'relative',
        height: '250px'
      }}>
        {/* Map Screenshot */}
        <img 
          src="/assets/media/map_screenshot.png" 
          alt="Map of Venue" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Fallback if image is missing */}
        <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
           <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Add map_screenshot.png</span>
        </div>
        <a 
          href={GOOGLE_MAPS_LINK} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'white',
            border: '1px solid #cbd5e1',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '0.8rem',
            color: '#0284c7',
            fontWeight: '500',
            cursor: 'pointer',
            textDecoration: 'none',
            zIndex: 10
          }}
        >
          Open in Maps ↗
        </a>
      </div>
      
      <a 
        href={GOOGLE_MAPS_LINK} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          marginTop: '30px',
          backgroundColor: 'var(--accent-color)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '24px',
          fontSize: '1rem',
          fontWeight: '500',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          boxShadow: '0 4px 10px rgba(140, 94, 80, 0.3)',
          textDecoration: 'none',
          display: 'inline-block'
        }}
      >
        View on Google Maps
      </a>
    </motion.div>
  );
};

export default VenueSection;
