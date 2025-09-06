import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCategoryById, getArticleById } from '../data/blogData';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ne pas afficher le breadcrumb sur la page d'accueil
  if (location.pathname === '/') {
    return null;
  }

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Accueil', path: '/' }
    ];

    // Gestion des différentes routes
    if (pathSegments[0] === 'blog') {
      if (pathSegments.length === 1) {
        // /blog
        breadcrumbs.push({ label: 'Blog', path: '/blog', isActive: true });
      } else if (pathSegments.length === 2) {
        // /blog/categoryId
        const categoryId = pathSegments[1];
        const category = getCategoryById(categoryId);
        breadcrumbs.push({ label: 'Blog', path: '/blog' });
        breadcrumbs.push({ 
          label: category?.title || 'Catégorie', 
          path: `/blog/${categoryId}`, 
          isActive: true 
        });
      } else if (pathSegments.length === 3) {
        // /blog/categoryId/articleId
        const categoryId = pathSegments[1];
        const articleId = pathSegments[2];
        const category = getCategoryById(categoryId);
        const article = getArticleById(categoryId, articleId);
        
        breadcrumbs.push({ label: 'Blog', path: '/blog' });
        breadcrumbs.push({ 
          label: category?.title || 'Catégorie', 
          path: `/blog/${categoryId}` 
        });
        breadcrumbs.push({ 
          label: article?.title || 'Article', 
          path: `/blog/${categoryId}/${articleId}`, 
          isActive: true 
        });
      }
    } else if (pathSegments[0] === 'project') {
      if (pathSegments.length === 1) {
        // /project
        breadcrumbs.push({ label: 'Projets', path: '/project', isActive: true });
      } else if (pathSegments.length === 2) {
        // /project/projectId
        const projectId = pathSegments[1];
        breadcrumbs.push({ label: 'Projets', path: '/project' });
        breadcrumbs.push({ 
          label: 'Détail du projet', 
          path: `/project/${projectId}`, 
          isActive: true 
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleNavigation = (path: string) => {
    if (path === '/') {
      navigate('/');
    } else if (path === '/blog') {
      navigate('/', { state: { scrollTo: 'blog' } });
    } else if (path === '/project') {
      navigate('/', { state: { scrollTo: 'projects' } });
    } else {
      navigate(path);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Fil d'Ariane"
      className="mb-6"
    >
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight 
                size={14} 
                className="text-slate-500 flex-shrink-0" 
                aria-hidden="true"
              />
            )}
            
            {item.isActive ? (
              <span 
                className="text-white font-medium truncate max-w-[200px] sm:max-w-none"
                aria-current="page"
              >
                {index === 0 && <Home size={14} className="inline mr-1" aria-hidden="true" />}
                {item.label}
              </span>
            ) : (
              <motion.button
                onClick={() => handleNavigation(item.path)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-slate-400 hover:text-white transition-colors duration-200 truncate max-w-[150px] sm:max-w-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-0.5"
                aria-label={`Naviguer vers ${item.label}`}
              >
                {index === 0 && <Home size={14} className="inline mr-1" aria-hidden="true" />}
                {item.label}
              </motion.button>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  );
};

export default Breadcrumb;