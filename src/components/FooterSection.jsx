import React from 'react';
import { motion } from 'framer-motion';

const FooterSection = () => {
  return (
    <motion.div 
      className="section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{ paddingBottom: '80px' }}
    >
      <div className="divider">♥</div>
      <p style={{ 
        fontFamily: 'var(--font-cursive)', 
        fontSize: '2.5rem', 
        color: 'var(--accent-color)',
        margin: '20px 0'
      }}>
        We Cannot Wait To Celebrate With You.
      </p>
      <p style={{ 
        fontFamily: 'var(--font-serif)', 
        fontSize: '1rem', 
        color: 'var(--text-color)',
        opacity: 0.8
      }}>
        Zishan & Zubiya
      </p>
    </motion.div>
  );
};

export default FooterSection;
