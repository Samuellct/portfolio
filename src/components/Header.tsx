import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const { t } = useTranslation();
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

  const navItems = [
    { name: t('nav.home'), id: 'home' },
    { name: t('nav.about'), id: 'about' },
    { name: t('nav.education'), id: 'education' },
    { name: t('nav.projects'), id: 'projects' },
    { name: t('nav.blog'), id: 'blog' },
    { name: t('nav.contact'), id: 'contact' },
  ];

  const shouldShowFloating = isHomePage ? scrolled && currentSection !== 'home' : true;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      // wrapper fixed plein écran ; pas de bg ici
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'pointer-events-none' : ''
      }`}
    >
      {/* conteneur centré ; devient "pilule" en desktop quand scrolled */}
      <div
        className={[
          'mx-auto px-3 transition-all duration-300',
          shouldShowFloating ? 'md:max-w-4xl md:mt-6' : 'md:max-w-7xl',
          'w-full',
          // Centrage de la navigation flottante
          shouldShowFloating ? 'md:mx-auto' : '',
        ].join(' ')}
      >
        <nav
          className={[
            'pointer-events-auto', // réactive les clics
            'px-4 py-3', // padding nav
            'transition-all duration-300',
            'focus:outline-none', // supprime l'outline par défaut
            shouldShowFloating
              ? // style "pilule" uniquement en desktop, utiliser backdrop-blur-md si on veut plus de lisibilite
                'md:rounded-full md:bg-slate-900/80 md:backdrop-blur md:shadow-xl md:border md:border-slate-700/50'
              : '',
          ].join(' ')}
          style={{ outline: 'none' }} // force la suppression de l'outline
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
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
                  className="relative text-slate-300 hover:text-white transition-colors duration-300 group font-semibold"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block w-full text-left py-2 text-slate-300 hover:text-white transition-colors duration-300 font-semibold"
                >
                  {item.name}
                </motion.button>
              ))}
            </motion.div>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;