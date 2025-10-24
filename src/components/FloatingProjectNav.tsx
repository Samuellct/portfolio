import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, FolderKanban } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface FloatingProjectNavProps {
  projectId?: string;
}

const FloatingProjectNav: React.FC<FloatingProjectNavProps> = ({ projectId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Back button : return to homepage and scroll to project section
  const handleBack = useCallback(() => {
    navigate('/', { replace: true });

    // Delay scroll until navigation is complete
    setTimeout(() => {
      const projectSection = document.getElementById('projects');
      if (projectSection) {
        projectSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        window.scrollTo({ top: 1600, behavior: 'smooth' }); // fallback scroll position
      }
    }, 400);
  }, [navigate]);

  // Home button
  const handleHome = useCallback(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  // Projects button
  const handleProjects = useCallback(() => {
    navigate('/project', { replace: true });
  }, [navigate]);

  const labels = { back: 'Back', home: 'Home', projects: 'All projects' };

  const navItems = useMemo(
    () => [
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
        icon: <FolderKanban size={20} />,
        label: labels.projects,
        onClick: handleProjects,
        color: 'hover:bg-purple-600',
      },
    ],
    [handleBack, handleHome, handleProjects, labels]
  );

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
              className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-all duration-300 ${item.color} group`}
              title={item.label}
            >
              <motion.div
                whileHover={{ rotate: item.label === labels.back ? -10 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {item.icon}
              </motion.div>
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs bg-slate-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-slate-600 shadow-lg">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingProjectNav;
