import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, BookOpen } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface FloatingNavProps {
  categoryId?: string;
  articleId?: string;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ categoryId, articleId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation helpers
  const handleBack = useCallback(() => {
    if (articleId && categoryId) {
      // From article → category
      navigate(`/blog/${categoryId}`, { replace: true });
    } else if (categoryId) {
      // From category → /blog page
      navigate('/blog', { replace: true });
    } else {
      // Fallback → home
      navigate('/', { replace: true });
    }
  }, [navigate, categoryId, articleId]);

  const handleHome = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  const handleBlog = useCallback(() => {
    navigate('/blog', { replace: true });
  }, [navigate]);

  // Static labels (English only)
  const labels = { back: 'Back', home: 'Home', blog: 'Blog' };

  // Determine which buttons to show
  const navItems = useMemo(() => {
    if (articleId && categoryId) {
      // Article page
      return [
        {
          icon: <ArrowLeft size={20} />,
          label: labels.back,
          onClick: handleBack,
          color: 'hover:bg-slate-700',
        },
        {
          icon: <Home size={20} />,
          label: labels.home,
          onClick: handleHome,
          color: 'hover:bg-blue-600',
        },
        {
          icon: <BookOpen size={20} />,
          label: labels.blog,
          onClick: handleBlog,
          color: 'hover:bg-purple-600',
        },
      ];
    } else if (categoryId) {
      // Category page
      return [
        {
          icon: <ArrowLeft size={20} />,
          label: labels.back,
          onClick: handleBlog,
          color: 'hover:bg-slate-700',
        },
        {
          icon: <Home size={20} />,
          label: labels.home,
          onClick: handleHome,
          color: 'hover:bg-blue-600',
        },
      ];
    } else {
      // Generic page
      return [
        {
          icon: <Home size={20} />,
          label: labels.home,
          onClick: handleHome,
          color: 'hover:bg-blue-600',
        },
      ];
    }
  }, [articleId, categoryId, handleBack, handleHome, handleBlog, labels]);

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-6 inset-x-0 z-50"
    >
      <div className="container mx-auto px-4 flex justify-center">
        <div className="flex items-center gap-1 md:gap-2 bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-full px-3 md:px-4 py-2 md:py-3 shadow-2xl pointer-events-auto">
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              onClick={item.onClick}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-all duration-300 ${item.color} group touch-manipulation`}
              title={item.label}
              style={{ pointerEvents: 'auto' }}
            >
              <motion.div
                whileHover={{ rotate: item.label === labels.back ? -10 : 0 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none"
              >
                {item.icon}
              </motion.div>
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-slate-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-slate-600 shadow-lg">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingNav;
