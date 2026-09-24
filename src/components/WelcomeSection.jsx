import React from 'react';
import { motion } from 'framer-motion';

const WelcomeSection = () => {
  return (
    <motion.div 
      className="section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      style={{ padding: '60px 20px', backgroundColor: 'var(--bg-color)' }}
    >
      <div className="divider">♥</div>
      <p style={{ 
        fontFamily: 'var(--font-serif)', 
        fontSize: '1.4rem', 
        lineHeight: '1.8',
        color: 'var(--text-color)',
        textAlign: 'center',
        margin: '20px 0'
      }}>
        We are honored to welcome you to the<br/>
        <b> Wedding Ceremony of Zishan & Zubiya<br/></b>
        As they begin their journey together in<br/>
        faith and love,<br/>
        we thank you for being part of this<br/>
        blessed occasion ❤️
      </p>
      <div className="divider">♥</div>
    </motion.div>
  );
};

export default WelcomeSection;
