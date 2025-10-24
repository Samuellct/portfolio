import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import en from '../constants/en.json';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/' || location.pathname === '';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track which section is visible for highlighting in nav
  useEffect(() => {
    if (!isHomePage) return;

    const handleSectionChange = () => {
      const sections = ['home', 'about', 'education', 'projects', 'blog', 'contact'];

      // Force contact si on est en bas de page
      const nearBottom =
        window.innerHeight + window.scrollY >=
        (document.documentElement.scrollHeight || document.body.scrollHeight) - 2;
      if (nearBottom) {
        setCurrentSection('contact');
        return;
      }

      // 2) Utiliser le milieu du viewport (plus fiable que scrollY+100)
      const viewportMiddle = window.scrollY + window.innerHeight / 2;

      // Décalage pour compenser la hauteur visuelle du header (à ajuster si besoin)
      const headerOffset = 80;

      let active = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;

      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;

      if (viewportMiddle >= top - headerOffset && viewportMiddle < bottom - headerOffset) {
        active = id;
        break;
      }
    }

      setCurrentSection(active);
    };
      

    window.addEventListener('scroll', handleSectionChange);
    handleSectionChange(); // initial check
    return () => window.removeEventListener('scroll', handleSectionChange);
  }, [isHomePage]);

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      setIsOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };
  
  const navLabels = (en as any)?.nav || {};
  const navItems = [
    { name: navLabels.home ?? 'Home', id: 'home' },
    { name: navLabels.about ?? 'About', id: 'about' },
    { name: navLabels.education ?? 'Education', id: 'education' },
    { name: navLabels.projects ?? 'Projects', id: 'projects' },
    { name: navLabels.blog ?? 'Blog', id: 'blog' },
    { name: navLabels.contact ?? 'Contact', id: 'contact' },
  ];

  const shouldShowFloating = isHomePage ? scrolled && currentSection !== 'home' : true;

  const headerVariants = {
    fixed: { y: 0, transition: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 } },
    floating: { y: 0, transition: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 } },
  };

  const navVariants = {
    fixed: {
      borderRadius: 0,
      backgroundColor: 'rgba(15, 23, 42, 0)',
      backdropFilter: 'blur(0px)',
      boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
      border: '1px solid rgba(51, 65, 85, 0)',
      scale: 1,
      transition: { type: 'spring', stiffness: 400, damping: 40, mass: 0.6 },
    },
    floating: {
      borderRadius: 9999,
      backgroundColor: 'rgba(15, 23, 42, 0.5)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      border: '1px solid rgba(51, 65, 85, 0.5)',
      scale: 1,
      transition: { type: 'spring', stiffness: 400, damping: 40, mass: 0.6 },
    },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate="fixed"
      variants={headerVariants}
      className="fixed inset-x-0 top-0 z-40"
      style={{ pointerEvents: 'none' }}
    >
      <motion.div
        className="mx-auto px-3 w-full"
        animate={{
          maxWidth: shouldShowFloating ? '56rem' : '80rem',
          marginTop: shouldShowFloating ? '1.5rem' : '0rem',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 35, mass: 0.7 }}
      >
        <motion.nav
          className="px-4 py-3 focus:outline-none"
          style={{ outline: 'none', pointerEvents: 'auto' }}
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
                if (isHomePage) scrollToSection('home');
                else navigate('/');
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
                  className={`relative transition-colors duration-300 group font-semibold
                    ${
                      currentSection === item.id
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400'
                      : shouldShowFloating
                        ? 'text-slate-300 hover:text-white'
                        : 'text-white/90 hover:text-cyan-300'
                    }`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
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
              transition={{ duration: 0.3, ease: 'easeInOut' }}
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
            </motion.div>
          )}
        </motion.nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;
