import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock, Heart, MessageCircle, User, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import FloatingNav from './FloatingNav';
import Breadcrumb from './Breadcrumb';
import { getArticleById, getRelatedArticles, getArticlePreview, articlesData, type ArticleData } from '../data/blogData';

const BlogArticle: React.FC = () => {
  const { categoryId, articleId } = useParams<{ categoryId: string; articleId: string }>();

  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<Array<{ id: string; author: string; content: string; date: string }>>([]);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId, articleId]);

  const articleData = useMemo((): ArticleData | null => {
    if (!categoryId || !articleId) return null;
    return getArticleById(categoryId, articleId);
  }, [categoryId, articleId]);

  const relatedArticles = useMemo(() => {
    if (!articleData || !categoryId) return [];
    return getRelatedArticles(articleData.id, categoryId, 3);
  }, [articleData, categoryId]);

  // Load likes & comments from API
  useEffect(() => {
    if (!articleData) return;
    const load = async () => {
      try {
        const [likesRes, commentsRes] = await Promise.all([
          fetch(`/api/likes/${articleData.id}`),
          fetch(`/api/comments/${articleData.id}`),
        ]);
        const likesJson = await likesRes.json();
        const commentsJson = await commentsRes.json();
        setLikes(typeof likesJson?.count === 'number' ? likesJson.count : 0);
        setComments(Array.isArray(commentsJson?.items) ? commentsJson.items : []);
      } catch (e) {
        console.error('Error loading likes/comments', e);
      }
    };
    load();
  }, [articleData]);

  if (!articleData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
        </div>
        <FloatingNav categoryId={categoryId} articleId={articleId} />
      </div>
    );
  }

  const handleLike = async () => {
    if (hasLiked || !articleData) return;
    setHasLiked(true);
    setLikes((prev) => prev + 1);
    try {
      const res = await fetch(`/api/likes/${articleData.id}`, { method: 'POST' });
      const json = await res.json();
      if (typeof json?.count === 'number') setLikes(json.count);
    } catch (e) {
      console.error('Like error', e);
      setHasLiked(false);
      setLikes((prev) => Math.max(0, prev - 1));
    }
  };

  // Date formatting → EN (US locale)
  const dtf = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
    hour12: false,
  });
  const formatCommentDate = (s: string) => {
    const d = new Date(s);
    return isNaN(d.getTime()) ? s : dtf.format(d);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleData) return;
    if (!newComment.trim() || !commentAuthor.trim()) return;

    const optimistic = {
      id: `tmp-${Date.now()}`,
      author: commentAuthor,
      content: newComment,
      date: new Date().toISOString(),
    };

    setComments((prev) => [optimistic, ...prev]);
    setNewComment('');
    setCommentAuthor('');

    try {
      const res = await fetch(`/api/comments/${articleData.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author: optimistic.author, content: optimistic.content }),
      });
      const json = await res.json();
      if (json?.item?.id) {
        setComments((prev) => [json.item, ...prev.filter((c) => c.id !== optimistic.id)]);
      }
    } catch (e) {
      console.error('Error posting comment', e);
      setComments((prev) => prev.filter((c) => c.id !== optimistic.id));
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
          <div className="max-w-4xl mx-auto">
            <Breadcrumb />
          </div>

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
            className="mb-12 prose prose-lg prose-invert max-w-none text-justify"
          >
            <ReactMarkdown>{articleData.content}</ReactMarkdown>
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
              <span className="text-sm">{hasLiked ? 'Thanks!' : 'Like'}</span>
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
              <div className="flex items-center gap-2"><Calendar size={16} /><span>Published on {articleData.date}</span></div>
              <div className="flex items-center gap-2"><Clock size={16} /><span>{articleData.readTime}</span></div>
              <div className="flex items-center gap-2"><User size={16} /><span>{articleData.author}</span></div>
              <div className="flex items-center gap-2"><Tag size={16} /><span>{articleData.category}</span></div>
            </div>
          </motion.div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="bg-slate-800/30 p-8 rounded-xl border border-slate-700 mb-16"
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                Related Articles
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedArticles.map((article, index) => {
                  let articleCategoryId = '';
                  Object.keys(articlesData).forEach(catId => {
                    if (articlesData[catId][article.id]) {
                      articleCategoryId = catId;
                    }
                  });

                  return (
                    <Link
                      key={article.id}
                      to={`/blog/${articleCategoryId}/${article.id}`}
                      className="group"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        className="bg-slate-700/30 rounded-lg border border-slate-600 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
                      >
                        <div className="relative">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-1 text-xs bg-blue-600/80 text-blue-100 rounded-full font-medium">
                              {article.category}
                            </span>
                          </div>
                        </div>

                        <div className="p-4">
                          <h4 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                            <div className="flex items-center gap-1"><Calendar size={12} /><span>{article.date}</span></div>
                            <div className="flex items-center gap-1"><Clock size={12} /><span>{article.readTime}</span></div>
                          </div>
                          <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                            {getArticlePreview(article.content)}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {article.keywords.slice(0, 2).map((keyword) => (
                              <span key={keyword} className="px-2 py-1 bg-slate-600/50 text-slate-400 text-xs rounded-full">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="bg-slate-800/30 p-8 rounded-xl border border-slate-700"
          >
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle size={24} className="text-blue-400" />
              <h3 className="text-2xl font-bold text-white">
                Comments ({comments.length})
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  required
                />
              </div>
              <textarea
                placeholder="Your comment..."
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
                Post comment
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
                    <span className="text-sm text-slate-400">{formatCommentDate(comment.date)}</span>
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