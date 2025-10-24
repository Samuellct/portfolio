import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { articlesData, getArticlePreview } from '../data/blogData';
import t from '../constants/en.json';

const Blog: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  // 🔹 Gather all visible articles
  const allArticles = useMemo(() => {
    return Object.values(articlesData)
      .flatMap(cat => Object.values(cat))
      .filter(a => a.visible !== false);
  }, []);

  // 🔹 Sort by date (latest first)
  const latestArticle = useMemo(() => {
    return [...allArticles].sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    )[0];
  }, [allArticles]);

  // 🔹 Pick 2 random others (visible only)
  const randomArticles = useMemo(() => {
    return [...allArticles]
      .filter(a => a.id !== latestArticle?.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
  }, [allArticles, latestArticle]);

  if (!latestArticle) return null;

  return (
    <section id="blog" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold mb-4">{t.blog.title}</h2>
          <p className="text-lg text-slate-300">{t.blog.subtitle}</p>
        </motion.div>

        {/* 🧭 Latest Publication */}
        <Link
          to={`/blog/${latestArticle.category.toLowerCase()}/${latestArticle.id}`}
          className="block group mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden border border-slate-700 bg-slate-900/40 shadow-lg cursor-pointer"
          >
            <img
              src={latestArticle.image}
              alt={latestArticle.title}
              className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
            <div className="absolute top-5 left-5 bg-blue-600/80 text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wide">
              Latest Publication
            </div>
            <div className="absolute bottom-0 p-8 text-left text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                {latestArticle.title}
              </h3>
              <p className="text-sm text-slate-400 mb-3">
                {latestArticle.date} • {latestArticle.readTime}
              </p>
              <p className="text-slate-300 max-w-2xl text-sm leading-relaxed">
                {getArticlePreview(latestArticle.content)}
              </p>
            </div>
          </motion.div>
        </Link>

        {/* 💡 You may also like */}
        {randomArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-cyan-800/30 via-blue-900/20 to-indigo-900/30 
             p-10 rounded-xl border border-blue-500/30 mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-slate-50">
              You may also like
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {randomArticles.map((article, i) => (
                <Link
                  key={article.id}
                  to={`/blog/${article.category.toLowerCase()}/${article.id}`}
                  className="block group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                    className="flex flex-col md:flex-row items-center md:items-stretch gap-6 
                               bg-slate-900/40 border border-slate-700 rounded-2xl 
                               overflow-hidden shadow-md hover:shadow-cyan-500/10 
                               cursor-pointer transition-all duration-300"
                  >
                    <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex flex-col justify-center text-left p-6 md:p-8 w-full md:w-2/3">
                      <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-sm text-slate-400 mb-3">
                        {article.date} • {article.readTime}
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {getArticlePreview(article.content)}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* 🎯 View all */}
        <div className="flex justify-center">
          <Link to="/blog" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white 
                         bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full 
                         shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-400/40 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 group"
            >
              <span>{t.blog.viewAll}</span>
              <ArrowRight
                size={18}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-20"></span>
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;