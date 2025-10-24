import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowDown } from 'lucide-react';
import FloatingObjects from './FloatingObjects';
import ParticleBackground from './ParticleBackground';
import TypewriterText from './TypewriterText';
import en from '../constants/en.json';

const Hero: React.FC = () => {
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

  const hero = en.hero;
  const [firstName, lastName] = hero.name.split(' ');
  
  //const firstName = name;
  //const lastName = name[1]; utile pour l'animation de typewritter mais normalement j'en ai plus besoin

  return (
    <section
      id="home"
      className="min-h-screen md:min-h-screen flex items-center justify-center relative overflow-hidden"
      ref={ref}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-900 to-purple-900/20" />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Floating 3D Objects */}
      <FloatingObjects />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Name */}
          <div className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent min-h-[1.2em]">
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

          {/* Title */}
          <AnimatePresence>
            {animationStage >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl md:text-2xl text-blue-300 mb-6 font-medium"
              >
                {hero.title}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence>
            {animationStage >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-slate-400 mb-12 max-w-xl mx-auto"
              >
                {hero.subtitle}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <AnimatePresence>
            {animationStage >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToAbout}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  {hero.cta}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToContact}
                  className="px-10 py-4 border border-slate-600 text-slate-300 rounded-lg font-medium backdrop-blur-sm bg-slate-800/50 hover:bg-slate-800 hover:border-slate-500 transition-all duration-300"
                >
                  {hero.contact}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll Down Button */}
      <motion.button
        onClick={scrollToAbout}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 text-blue-400 hover:text-blue-300 transition-colors duration-300"
        aria-label="Scroll to About section"
      >
        <ArrowDown size={28} />
      </motion.button>
    </section>
  );
};

export default Hero;