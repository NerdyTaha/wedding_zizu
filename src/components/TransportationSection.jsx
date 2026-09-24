import React from 'react';
import { motion } from 'framer-motion';

const TransportationSection = () => {
  return (
    <motion.div 
      className="section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="8" rx="2"></rect>
          <path d="M4 11L7 6h10l3 5"></path>
          <circle cx="7" cy="19" r="2"></circle>
          <circle cx="17" cy="19" r="2"></circle>
        </svg>
      </div>
      <h2 className="cursive-title">Transportation/Parking</h2>
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
        Two-wheeler and Four-wheeler parking available at Kohinoor hall, Jogeshwari. 
      </p>
    </motion.div>
  );
};

export default TransportationSection;
