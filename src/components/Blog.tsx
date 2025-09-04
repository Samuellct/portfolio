import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Mountain, Microscope, Code2, ArrowRight } from 'lucide-react';
import { getAllCategories } from '../data/blogData';

const Blog: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Get categories from centralized data
  const blogCategories = getAllCategories();

  // Get icon component based on category icon name
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mountain':
        return <Mountain size={24} />;
      case 'Microscope':
        return <Microscope size={24} />;
      case 'Code2':
        return <Code2 size={24} />;
      default:
        return <Code2 size={24} />;
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/blog/${categoryId}`);
  };

  return (
    <section id="blog" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4">{t('blog.title')}</h2>
          <p className="text-xl text-slate-300 mb-12">{t('blog.subtitle')}</p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {blogCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => handleCategoryClick(category.id)}
                className={`bg-gradient-to-br ${category.bgGradient} p-8 rounded-xl border border-slate-700 ${category.hoverColor} transition-all duration-300 cursor-pointer group`}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {getCategoryIcon(category.icon)}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-slate-100 transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-4 group-hover:text-slate-300 transition-colors duration-300">
                  {category.description}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                  <span>Explorer</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-slate-900/30 p-8 rounded-xl border border-slate-700"
          >
            <h3 className="text-xl font-bold mb-4 text-white">
              Contenu en développement
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Les articles sont en cours de rédaction. Chaque catégorie proposera bientôt des contenus riches et détaillés sur mes expériences et découvertes.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;