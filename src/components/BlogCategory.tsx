import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Mountain, Microscope, Code2 } from 'lucide-react';
import FloatingNav from './FloatingNav';
import Breadcrumb from './Breadcrumb';
import { getCategoryById, getArticlesByCategory, getArticlePreview } from '../data/blogData';

const BlogCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  // Get category data and articles using centralized data
  const categoryData = useMemo(() => {
    if (!categoryId) return null;
    return getCategoryById(categoryId);
  }, [categoryId]);

  const articles = useMemo(() => {
    if (!categoryId) return [];
    return getArticlesByCategory(categoryId);
  }, [categoryId]);

  // Get icon component based on category
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mountain':
        return <Mountain size={32} />;
      case 'Microscope':
        return <Microscope size={32} />;
      case 'Code2':
        return <Code2 size={32} />;
      default:
        return <Code2 size={32} />;
    }
  };

  const handleArticleClick = (articleId: string) => {
    navigate(`/blog/${categoryId}/${articleId}`);
  };

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Catégorie non trouvée</h1>
        </div>
        <FloatingNav categoryId={categoryId} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700"
      >
        <div className="container mx-auto px-6 py-8 pt-16 md:pt-8">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${categoryData.color} rounded-2xl mb-6 text-white`}>
              {getCategoryIcon(categoryData.icon)}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              {categoryData.title}
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              {categoryData.description}
            </p>
          </motion.div>
        </div>
      </motion.header>

      {/* Articles Grid */}
      <main className="container mx-auto px-6 py-12 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                onClick={() => handleArticleClick(article.id)}
                className="bg-slate-800/50 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="relative overflow-hidden h-48 md:h-full">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium bg-gradient-to-r ${categoryData.color} text-white`}>
                          {article.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-8">
                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                      {article.title}
                    </h2>
                    
                    <p className="text-slate-300 leading-relaxed mb-6 line-clamp-3">
                      {getArticlePreview(article.content)}
                    </p>
                    
                    <div className="flex items-center gap-2 text-blue-400 font-medium group-hover:gap-3 transition-all duration-300">
                      <span>Lire l'article</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <FloatingNav categoryId={categoryId} />
    </div>
  );
};

export default BlogCategory;