import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Heart, MessageCircle, User, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import FloatingNav from './FloatingNav';
import { getArticleById, type ArticleData } from '../data/blogData';

const BlogArticle: React.FC = () => {
  const { categoryId, articleId } = useParams<{ categoryId: string; articleId: string }>();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Array<{ id: string; author: string; content: string; date: string }>>([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId, articleId]); // Add categoryId to dependencies

  const articleData = useMemo((): ArticleData | null => {
    if (!categoryId || !articleId) return null;
    return getArticleById(categoryId, articleId);
  }, [categoryId, articleId]);

  useEffect(() => {
    if (articleData) {
      setLikes(articleData.likes);
      // Simulate some existing comments
      setComments([
        {
          id: '1',
          author: 'Marie Dubois',
          content: 'Excellent article ! Très instructif et bien documenté.',
          date: '12 Janvier 2025'
        },
        {
          id: '2',
          author: 'Pierre Martin',
          content: 'Merci pour ce partage d\'expérience, cela m\'aide beaucoup pour mon propre projet.',
          date: '11 Janvier 2025'
        }
      ]);
    }
  }, [articleData]);

  if (!articleData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
        </div>
        <FloatingNav categoryId={categoryId} articleId={articleId} />
      </div>
    );
  }

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && commentAuthor.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: commentAuthor,
        content: newComment,
        date: new Date().toLocaleDateString('fr-FR')
      };
      setComments(prev => [comment, ...prev]);
      setNewComment('');
      setCommentAuthor('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Article Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700 pt-16 md:pt-0"
      >
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent leading-tight">
              {articleData.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {articleData.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-slate-700/50 text-slate-400 text-sm rounded-full border border-slate-600"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Article Content */}
      <main className="container mx-auto px-6 py-12 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <div className="relative overflow-hidden rounded-xl border border-slate-700">
              <img
                src={articleData.image}
                alt={articleData.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>
            <p className="text-sm text-slate-400 mt-3 italic text-center">
              {articleData.imageCaption}
            </p>
          </motion.div>

          {/* Article Body */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <div className="prose prose-lg prose-invert max-w-none text-justify">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-white mt-8 mb-4 first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                      {children}
                    </p>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-white font-semibold">
                      {children}
                    </strong>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-slate-300 mb-6 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-slate-300 mb-6 space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-slate-300 leading-relaxed">
                      {children}
                    </li>
                  ),
                  code: ({ children }) => (
                    <code className="bg-slate-700 px-2 py-1 rounded text-cyan-300 font-mono text-sm">
                      {children}
                    </code>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-6 italic text-slate-400 my-6">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {articleData.content}
              </ReactMarkdown>
            </div>
          </motion.article>

          {/* Like Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center mb-12"
          >
            <motion.button
              onClick={handleLike}
              disabled={hasLiked}
              whileHover={{ scale: hasLiked ? 1 : 1.05 }}
              whileTap={{ scale: hasLiked ? 1 : 0.95 }}
              className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${
                hasLiked
                  ? 'bg-red-600/20 border-red-500/50 text-red-400 cursor-default'
                  : 'bg-slate-800/50 border-slate-600 text-slate-400 hover:border-red-500/50 hover:text-red-400 hover:bg-red-600/10'
              }`}
            >
              <Heart size={20} className={hasLiked ? 'fill-current' : ''} />
              <span className="font-medium">{likes}</span>
              <span className="text-sm">{hasLiked ? 'Merci !' : 'J\'aime'}</span>
            </motion.button>
          </motion.div>

          {/* Article Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-slate-800/30 p-6 rounded-xl border border-slate-700 mb-12"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Publié le {articleData.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{articleData.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                <span>{articleData.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} />
                <span>{articleData.category}</span>
              </div>
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-slate-800/30 p-8 rounded-xl border border-slate-700"
          >
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle size={24} className="text-blue-400" />
              <h3 className="text-2xl font-bold text-white">
                Commentaires ({comments.length})
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  required
                />
              </div>
              <textarea
                placeholder="Votre commentaire..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none mb-4"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
              >
                Publier le commentaire
              </motion.button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-700/30 p-6 rounded-lg border border-slate-600"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-white">{comment.author}</h4>
                    <span className="text-sm text-slate-400">{comment.date}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{comment.content}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <FloatingNav categoryId={categoryId} articleId={articleId} />
    </div>
  );
};

export default BlogArticle;