import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed top-6 right-6 z-50"
    >
      <motion.button
        onClick={toggleLanguage}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-blue-500/50 transition-all duration-300"
      >
        <Globe size={16} />
        <span className="font-medium">
          {i18n.language === 'fr' ? 'EN' : 'FR'}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default LanguageSwitcher;