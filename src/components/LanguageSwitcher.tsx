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

  const nextLabel = i18n.language === 'fr' ? 'Switch language to English' : 'Passer le site en français';
  const nextCode  = i18n.language === 'fr' ? 'EN' : 'FR';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed top-6 right-6 z-50"
    >
      <motion.button
        type="button"
        onClick={toggleLanguage}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={nextLabel}
        title={nextLabel}
        className="
          inline-flex items-center gap-2
          px-3 py-3 md:px-4 md:py-3
          min-w-[44px] min-h-[44px]
          rounded-lg border border-slate-700
          bg-slate-800/90 backdrop-blur-md
          text-slate-200 hover:text-white hover:border-blue-500/50
          transition-all duration-300
          focus-visible:outline focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-sky-500
        "
      >
        <Globe size={16} aria-hidden="true" focusable="false" />
        <span className="font-medium">{nextCode}</span>
      </motion.button>
    </motion.div>
  );
};

export default LanguageSwitcher;