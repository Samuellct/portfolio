import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  SortAsc,
  SortDesc,
  Grid3x2 as Grid3X3,
  List,
  Calendar,
  Clock,
  ExternalLink,
  Mountain,
  Microscope,
  Code as Code2,
  User,
  Tag,
  BookOpen,
} from 'lucide-react';
import FloatingNav from './FloatingNav';
import Breadcrumb from './Breadcrumb';
import {
  getAllCategories,
  articlesData,
  getArticlePreview,
  type ArticleData,
  type CategoryData,
} from '../data/blogData';

interface BlogPost extends ArticleData {
  categoryData: CategoryData;
}

const BlogListing: React.FC = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedKeyword, setSelectedKeyword] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'readTime'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 9;

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const blogPosts: BlogPost[] = useMemo(() => {
    const posts: BlogPost[] = [];
    const categories = getAllCategories();

    Object.keys(articlesData).forEach((categoryId) => {
      const categoryData = categories.find((cat) => cat.id === categoryId);
      if (categoryData) {
        Object.values(articlesData[categoryId])
          .filter((article) => article.visible !== false) // masquer les articles non visibles
          .forEach((article) => {
            posts.push({
              ...article,
              categoryData,
            });
          });
      }
    });

    return posts;
  }, []);

  const allKeywords = useMemo(() => {
    const keywords = new Set<string>();
    blogPosts.forEach((post) => {
      post.keywords.forEach((keyword) => keywords.add(keyword));
    });
    return Array.from(keywords).sort();
  }, [blogPosts]);

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'all' || post.categoryData.id === selectedCategory;
      const matchesKeyword =
        selectedKeyword === 'all' || post.keywords.includes(selectedKeyword);

      return matchesSearch && matchesCategory && matchesKeyword;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'readTime':
          const aTime = parseInt(a.readTime.split(' ')[0]);
          const bTime = parseInt(b.readTime.split(' ')[0]);
          comparison = aTime - bTime;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [blogPosts, searchTerm, selectedCategory, selectedKeyword, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / itemsPerPage);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedKeyword]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mountain':
        return <Mountain size={20} />;
      case 'Microscope':
        return <Microscope size={20} />;
      case 'Code2':
        return <Code2 size={20} />;
      default:
        return <BookOpen size={20} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-lg text-slate-300">Loading articles...</p>
        </div>
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
        className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700 pt-16 md:pt-0"
      >
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                All Articles
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl">
                Discover all my articles about science, technology, and my personal adventures.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Filters and Controls */}
      <section className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search for an article or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                aria-label="Search for articles"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                >
                  <option value="all">All</option>
                  {getAllCategories().map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Keyword Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Keyword
                </label>
                <select
                  value={selectedKeyword}
                  onChange={(e) => setSelectedKeyword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                >
                  <option value="all">All</option>
                  {allKeywords.map((keyword) => (
                    <option key={keyword} value={keyword}>
                      {keyword}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Sort by
                </label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as 'date' | 'title' | 'readTime')
                    }
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  >
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                    <option value="readTime">Reading time</option>
                  </select>
                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                    }
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-300 hover:text-white hover:border-blue-500 transition-all duration-300"
                  >
                    {sortOrder === 'asc' ? (
                      <SortAsc size={20} />
                    ) : (
                      <SortDesc size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* View Mode + Home */}
              <div className="flex flex-col justify-end">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 mr-2">View:</span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
                    }`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
                    }`}
                    aria-label="List view"
                  >
                    <List size={18} />
                  </button>
                </div>

                <Link
                  to="/"
                  className="ml-0 md:ml-4 mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  aria-label="Go home"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9,22 9,12 15,12 15,22" />
                  </svg>
                  Home
                </Link>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-slate-400">
              {filteredAndSortedPosts.length} article
              {filteredAndSortedPosts.length !== 1 ? 's' : ''} found
            </div>
          </motion.div>

          {/* Blog Posts */}
          <AnimatePresence mode="wait">
            {filteredAndSortedPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No articles found
                </h3>
                <p className="text-slate-400 mb-6">
                  Try adjusting your search criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedKeyword('all');
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Reset filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={`${viewMode}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={
                  viewMode === 'grid'
                    ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
                    : 'space-y-6'
                }
              >
                {paginatedPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.categoryData.id}/${post.id}`}
                    className="block group"
                  >
                    <motion.article
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className={`bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 overflow-hidden ${
                        viewMode === 'list' ? 'flex' : ''
                      }`}
                    >
                      <div
                        className={`relative overflow-hidden ${
                          viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'
                        }`}
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="text-white">
                            {getCategoryIcon(post.categoryData.icon)}
                          </div>
                          <div className="absolute bottom-4 right-4 bg-blue-600 p-2 rounded-full">
                            <ExternalLink size={16} className="text-white" />
                          </div>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span
                            className={`px-3 py-1 text-xs rounded-full font-medium bg-gradient-to-r ${post.categoryData.color} text-white`}
                          >
                            {post.categoryData.title}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1">
                        <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{post.readTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            <span>{post.author}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 mb-3">
                          {post.title}
                        </h3>

                        <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {getArticlePreview(post.content)}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.keywords
                            .slice(0, viewMode === 'list' ? 4 : 3)
                            .map((keyword) => (
                              <span
                                key={keyword}
                                className="px-2 py-1 bg-slate-700/80 text-xs rounded-full text-slate-300 font-medium border border-slate-600"
                              >
                                {keyword}
                              </span>
                            ))}
                          {post.keywords.length >
                            (viewMode === 'list' ? 4 : 3) && (
                            <span className="px-2 py-1 bg-slate-600/50 text-xs rounded-full text-slate-400 font-medium">
                              +{post.keywords.length -
                                (viewMode === 'list' ? 4 : 3)}
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <Tag size={12} />
                          {post.category}
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center items-center gap-2 mt-12"
            >
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-500'
                    }`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <FloatingNav />
    </div>
  );
};

export default BlogListing;