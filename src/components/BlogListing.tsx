import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid3X3, 
  List,
  Calendar,
  Clock,
  ExternalLink,
  Mountain,
  Microscope,
  Code2,
  ChevronRight,
  User,
  Tag,
  Heart,
  Eye,
  BookOpen
} from 'lucide-react';
import FloatingNav from './FloatingNav';
import Breadcrumb from './Breadcrumb';
import { getAllCategories, articlesData, getArticlePreview, type ArticleData, type CategoryData } from '../data/blogData';

interface BlogPost extends ArticleData {
  categoryData: CategoryData;
}

const BlogListing: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Get all blog posts from centralized data
  const blogPosts: BlogPost[] = useMemo(() => {
    const posts: BlogPost[] = [];
    const categories = getAllCategories();
    
    Object.keys(articlesData).forEach(categoryId => {
      const categoryData = categories.find(cat => cat.id === categoryId);
      if (categoryData) {
        Object.values(articlesData[categoryId]).forEach(article => {
          posts.push({
            ...article,
            categoryData
          });
        });
      }
    });
    
    return posts;
  }, []);

  // Get unique keywords for filter
  const allKeywords = useMemo(() => {
    const keywords = new Set<string>();
    blogPosts.forEach(post => {
      post.keywords.forEach(keyword => keywords.add(keyword));
    });
    return Array.from(keywords).sort();
  }, [blogPosts]);

  // Filter and sort blog posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || post.categoryData.id === selectedCategory;
      const matchesKeyword = selectedKeyword === 'all' || post.keywords.includes(selectedKeyword);
      
      return matchesSearch && matchesCategory && matchesKeyword;
    });

    // Sort posts
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

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / itemsPerPage);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset pagination when filters change
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

  const handlePostClick = (post: BlogPost) => {
    navigate(`/blog/${post.categoryData.id}/${post.id}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-lg text-slate-300">Chargement des articles...</p>
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
                Tous les Articles
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl">
                Découvrez l'ensemble de mes articles sur la science, la technologie et mes aventures. 
                Chaque article partage mes expériences et connaissances dans différents domaines.
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
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher un article, un mot-clé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                aria-label="Rechercher des articles"
              />
            </div>

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Catégorie</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  aria-label="Filtrer par catégorie"
                >
                  <option value="all">Toutes</option>
                  {getAllCategories().map(category => (
                    <option key={category.id} value={category.id}>{category.title}</option>
                  ))}
                </select>
              </div>

              {/* Keyword Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Mot-clé</label>
                <select
                  value={selectedKeyword}
                  onChange={(e) => setSelectedKeyword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  aria-label="Filtrer par mot-clé"
                >
                  <option value="all">Tous</option>
                  {allKeywords.map(keyword => (
                    <option key={keyword} value={keyword}>{keyword}</option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Trier par</label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'readTime')}
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    aria-label="Critère de tri"
                  >
                    <option value="date">Date</option>
                    <option value="title">Titre</option>
                    <option value="readTime">Temps de lecture</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-300 hover:text-white hover:border-blue-500 transition-all duration-300"
                    aria-label={`Tri ${sortOrder === 'asc' ? 'croissant' : 'décroissant'}`}
                  >
                    {sortOrder === 'asc' ? <SortAsc size={20} /> : <SortDesc size={20} />}
                  </button>
                </div>
              </div>

              {/* View Mode and Results Count */}
              <div className="flex flex-col justify-end">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 mr-2">Vue:</span>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
                    }`}
                    aria-label="Vue en grille"
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
                    aria-label="Vue en liste"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-slate-400">
              {filteredAndSortedPosts.length} article{filteredAndSortedPosts.length !== 1 ? 's' : ''} trouvé{filteredAndSortedPosts.length !== 1 ? 's' : ''}
            </div>
          </motion.div>

          {/* Blog Posts Grid/List */}
          <AnimatePresence mode="wait">
            {filteredAndSortedPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-white mb-2">Aucun article trouvé</h3>
                <p className="text-slate-400 mb-6">Essayez de modifier vos critères de recherche</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedKeyword('all');
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Réinitialiser les filtres
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
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handlePostClick(post)}
                    className={`bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group overflow-hidden ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handlePostClick(post);
                      }
                    }}
                    aria-label={`Lire l'article ${post.title}`}
                  >
                    {/* Post Image */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'
                    }`}>
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
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium bg-gradient-to-r ${post.categoryData.color} text-white`}>
                          {post.categoryData.title}
                        </span>
                      </div>

                      {/* Likes Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1 px-2 py-1 bg-slate-900/90 text-white text-xs rounded-full">
                          <Heart size={12} className="text-red-400" />
                          <span>{post.likes}</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
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

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.keywords.slice(0, viewMode === 'list' ? 4 : 3).map((keyword) => (
                          <span
                            key={keyword}
                            className="px-2 py-1 bg-slate-700/80 text-xs rounded-full text-slate-300 font-medium border border-slate-600"
                          >
                            {keyword}
                          </span>
                        ))}
                        {post.keywords.length > (viewMode === 'list' ? 4 : 3) && (
                          <span className="px-2 py-1 bg-slate-600/50 text-xs rounded-full text-slate-400 font-medium">
                            +{post.keywords.length - (viewMode === 'list' ? 4 : 3)}
                          </span>
                        )}
                      </div>

                      {/* Post Category */}
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Tag size={12} />
                        {post.category}
                      </div>
                    </div>
                  </motion.article>
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
                aria-label="Page précédente"
              >
                Précédent
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-blue-500'
                  }`}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                aria-label="Page suivante"
              >
                Suivant
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