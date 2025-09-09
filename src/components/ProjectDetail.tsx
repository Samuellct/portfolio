import React from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, Calendar, MapPin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Breadcrumb from './Breadcrumb';
import { getProjectById } from '../data/projectData';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  // Find project in all categories
  const findProject = (id: string) => {
    // Try each category
    const categories = ['personal', 'academic', 'internship'];
    for (const category of categories) {
      const project = getProjectById(category, id);
      if (project) return project;
    }
    return null;
  };

  const project = projectId ? findProject(projectId) : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Projet non trouvé</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    navigate('/', { replace: true });
    // Scroll to projects section after navigation
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header with back button */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="max-w-4xl mx-auto mb-4">
            <Breadcrumb />
          </div>

          <motion.button
            onClick={handleBackClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors duration-300 border border-slate-600 hover:border-blue-500/50"
          >
            <ArrowLeft size={20} />
            <span>Retour aux projets</span>
          </motion.button>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Project header */}
          <div className="mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-6 mb-6 text-slate-300"
            >
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-blue-400" />
                <span>{project.period}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-purple-400" />
                <span>{project.location}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    project.category === 'personal'
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                      : project.category === 'academic'
                      ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                      : 'bg-green-600/20 text-green-300 border border-green-500/30'
                  }`}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Project image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <div className="relative overflow-hidden rounded-xl border border-slate-700">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>
          </motion.div>

          {/* Project description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-400">Description détaillée</h2>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-xl font-semibold text-white mt-6 mb-4">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold text-white mt-4 mb-3">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-slate-300 leading-relaxed mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 text-slate-300">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-300">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-slate-300">
                      {children}
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-white font-semibold">
                      {children}
                    </strong>
                  ),
                  code: ({ children }) => (
                    <code className="bg-slate-700 px-2 py-1 rounded text-cyan-300 font-mono text-sm">
                      {children}
                    </code>
                  ),
                }}
              >
                {project.detailedDescription}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* GitLab link */}
          {project.gitlabUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-center"
            >
              <motion.a
                href={project.gitlabUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94L2.36 9.1a.84.84 0 0 1 .8-.6h2.47c.26 0 .5.11.67.29L12 14.89l5.7-6.1c.17-.18.41-.29.67-.29h2.47c.35 0 .66.25.8.6l1.31 4.35c.12.4-.02.82-.3.94z"/>
                </svg>
                <span>Voir sur GitLab</span>
                <ExternalLink size={18} />
              </motion.a>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-center"
            >
              <p className="text-slate-400">Code source non disponible publiquement</p>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default ProjectDetail;