import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track current section for navigation styling
  useEffect(() => {
    if (!isHomePage) return;

    const handleSectionChange = () => {
      const sections = [
        'home',
        'about',
        'education',
        'projects',
        'blog',
        'contact',
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleSectionChange);
    handleSectionChange(); // Initial check

    return () => window.removeEventListener('scroll', handleSectionChange);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      // Navigate to home page first, then scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      setIsOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const getLanguageLabel = () => {
    return i18n.language === 'fr' ? 'EN' : 'FR';
  };

  const getLanguageTitle = () => {
    return i18n.language === 'fr' ? 'Switch language to English' : 'Passer le site en français';
  };

  const navItems = [
    { name: t('nav.home'), id: 'home' },
    { name: t('nav.about'), id: 'about' },
    { name: t('nav.education'), id: 'education' },
    { name: t('nav.projects'), id: 'projects' },
    { name: t('nav.blog'), id: 'blog' },
    { name: t('nav.contact'), id: 'contact' },
  ];

  const shouldShowFloating = isHomePage ? scrolled && currentSection !== 'home' : true;

  // Animation variants for smooth transitions
  const headerVariants = {
    fixed: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    },
    floating: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    }
  };

  const navVariants = {
    fixed: {
      borderRadius: 0,
      backgroundColor: "rgba(15, 23, 42, 0)",
      backdropFilter: "blur(0px)",
      boxShadow: "0 0 0 0 rgba(0, 0, 0, 0)",
      border: "1px solid rgba(51, 65, 85, 0)",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 0.6
      }
    },
    floating: {
      borderRadius: 9999,
      backgroundColor: "rgba(15, 23, 42, 0.8)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      border: "1px solid rgba(51, 65, 85, 0.5)",
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        mass: 0.6
      }
    }
  };
  return (
    <motion.header
      initial={{ y: -100 }}
      animate="fixed"
      variants={headerVariants}
      className="fixed inset-x-0 top-0 z-40"
      style={{
        // Prevent pointer events on the header wrapper, but allow on nav
        pointerEvents: 'none'
      }}
    >
      {/* Container with smooth width and positioning transitions */}
      <motion.div
        className="mx-auto px-3 w-full"
        animate={{
          maxWidth: shouldShowFloating ? '56rem' : '80rem', // 4xl vs 7xl
          marginTop: shouldShowFloating ? '1.5rem' : '0rem',
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 35,
          mass: 0.7
        }}
      >
        <motion.nav
          className="px-4 py-3 focus:outline-none"
          style={{ 
            outline: 'none',
            pointerEvents: 'auto' // Re-enable pointer events on nav
          }}
          animate={shouldShowFloating ? 'floating' : 'fixed'}
          variants={navVariants}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              onClick={() => {
                if (isHomePage) {
                  scrollToSection('home');
                } else {
                  navigate('/');
                }
              }}
            >
              SL
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative text-slate-300 hover:text-white transition-colors duration-300 group font-semibold"
                >
                  {item.name}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"
                  />
                </motion.button>
              ))}
              
              {/* Language Switcher - Desktop */}
              <motion.button
                onClick={toggleLanguage}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={getLanguageTitle()}
                className="relative flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white transition-colors duration-300 group font-semibold border border-slate-600 hover:border-blue-500/50 rounded-lg"
              >
                <Globe size={16} />
                <span className="text-sm">{getLanguageLabel()}</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden mt-4 pb-4"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full text-left py-2 text-slate-300 hover:text-white transition-colors duration-300 font-semibold"
                >
                  {item.name}
                </motion.button>
              ))}
              
              {/* Language Switcher - Mobile */}
              <motion.button
                onClick={toggleLanguage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 w-full text-left py-2 text-slate-300 hover:text-white transition-colors duration-300 font-semibold border-t border-slate-700 pt-4 mt-2"
              >
                <Globe size={18} />
                <span>{getLanguageTitle()}</span>
              </motion.button>
            </motion.div>
          )}
        </motion.nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;