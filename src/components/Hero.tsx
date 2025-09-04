import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { ArrowDown } from 'lucide-react';
import FloatingObjects from './FloatingObjects';
import ParticleBackground from './ParticleBackground';
import TypewriterText from './TypewriterText';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once for better performance
    threshold: 0.3,
  });

  const [animationStage, setAnimationStage] = useState(0);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFirstNameComplete = () => {
    setAnimationStage(1);
  };

  const handleLastNameComplete = () => {
    setAnimationStage(2);
  };

  const name = t('hero.name').split(' ');
  const firstName = name[0];
  const lastName = name[1];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" ref={ref}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-purple-900/20" />
      
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* 3D Floating Objects */}
      <FloatingObjects />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent min-h-[1.2em]">
            {inView && (
              <>
                <TypewriterText
                  text={firstName}
                  delay={500}
                  speed={150}
                  onComplete={handleFirstNameComplete}
                  className="inline-block"
                />
                {animationStage >= 1 && (
                  <>
                    <span> </span>
                    <TypewriterText
                      text={lastName}
                      delay={200}
                      speed={150}
                      onComplete={handleLastNameComplete}
                      className="inline-block"
                    />
                  </>
                )}
              </>
            )}
          </div>
          
          <AnimatePresence>
            {animationStage >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl md:text-2xl text-blue-400 mb-4 font-medium"
              >
                {t('hero.title')}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {animationStage >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto"
              >
                {t('hero.subtitle')}
              </motion.p>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {animationStage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToAbout}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  {t('hero.cta')}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToContact}
                  className="px-8 py-3 border border-slate-600 text-slate-300 rounded-lg font-medium hover:bg-slate-800 hover:border-slate-500 transition-all duration-300"
                >
                  {t('hero.contact')}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 text-slate-400 hover:text-white transition-colors duration-300"
      >
        <ArrowDown size={24} />
      </motion.button>
    </section>
  );
};

export default Hero;