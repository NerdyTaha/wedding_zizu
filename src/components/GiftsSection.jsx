import React from 'react';
import { motion } from 'framer-motion';

const GiftsSection = () => {
  return (
    <motion.div 
      className="section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 12 20 22 4 22 4 12"></polyline>
          <rect x="2" y="7" width="20" height="5"></rect>
          <line x1="12" y1="22" x2="12" y2="7"></line>
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
        </svg>
      </div>
      <h2 className="cursive-title">Gifts</h2>
      <div className="divider">♥</div>
      
      <p style={{ 
        fontFamily: 'var(--font-serif)', 
        fontSize: '1.2rem', 
        lineHeight: '1.8',
        color: 'var(--text-color)',
        textAlign: 'center',
        margin: '20px 0',
        maxWidth: '80%'
      }}>
        Your presence, blessings and love is the greatest gift we can ask for.
      </p>
    </motion.div>
  );
};

export default GiftsSection;
