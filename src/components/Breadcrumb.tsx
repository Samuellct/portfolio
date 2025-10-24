import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCategoryById, getArticleById } from '../data/blogData';
import { getProjectById } from '../data/projectData';

interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
}

const Breadcrumb: React.FC = () => {
  const location = useLocation();

  // Split the path into segments
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Do not display breadcrumb on the homepage
  if (pathSegments.length === 0) {
    return null;
  }

  // Helper: find project across all categories
  const findProjectAcrossCategories = (id: string) => {
    const cats = ['personal', 'academic', 'internship'] as const;
    for (const c of cats) {
      const p = getProjectById(c, id);
      if (p) return p;
    }
    return null;
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }];

    // Blog routes
    if (pathSegments[0] === 'blog') {
      if (pathSegments.length === 1) {
        breadcrumbs.push({ label: 'Blog', path: '/blog', isActive: true });
      } else if (pathSegments.length === 2) {
        const categoryId = pathSegments[1];
        const category = getCategoryById(categoryId);
        breadcrumbs.push({ label: 'Blog', path: '/blog' });
        breadcrumbs.push({
          label: category?.title || 'Category',
          path: `/blog/${categoryId}`,
          isActive: true,
        });
      } else if (pathSegments.length === 3) {
        const categoryId = pathSegments[1];
        const articleId = pathSegments[2];
        const category = getCategoryById(categoryId);
        const article = getArticleById(categoryId, articleId);
        breadcrumbs.push({ label: 'Blog', path: '/blog' });
        breadcrumbs.push({
          label: category?.title || 'Category',
          path: `/blog/${categoryId}`,
        });
        breadcrumbs.push({
          label: article?.title || 'Article',
          path: `/blog/${categoryId}/${articleId}`,
          isActive: true,
        });
      }
    }

    // Projects route: /project
    else if (pathSegments[0] === 'projects') {
      breadcrumbs.push({ label: 'Projects', path: '/project', isActive: true });
    }

    // Project detail route: /project/:id
    else if (pathSegments[0] === 'project') {
      if (pathSegments.length === 1) {
        // Edge case if someone navigates to /project (rare)
        breadcrumbs.push({ label: 'Projects', path: '/project', isActive: true });
      } else if (pathSegments.length === 2) {
        const projectId = pathSegments[1];
        const project = findProjectAcrossCategories(projectId);
        breadcrumbs.push({ label: 'Projects', path: '/project' });
        breadcrumbs.push({
          label: project?.title || 'Project',
          path: `/project/${projectId}`,
          isActive: true,
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      aria-label="Breadcrumb navigation"
      className="mb-20"
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
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.path}
                  className="text-slate-400 hover:text-white transition-colors duration-200 truncate max-w-[150px] sm:max-w-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-1 py-0.5 inline-flex items-center"
                  aria-label={`Go to ${item.label}`}
                >
                  {index === 0 && <Home size={14} className="inline mr-1" aria-hidden="true" />}
                  {item.label}
                </Link>
              </motion.div>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  );
};

export default Breadcrumb;
