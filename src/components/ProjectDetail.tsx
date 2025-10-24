import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink, Calendar, MapPin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Breadcrumb from './Breadcrumb';
import { getProjectById } from '../data/projectData';
import FloatingProjectNav from './FloatingProjectNav';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  // Find project in all categories
  const findProject = (id: string) => {
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
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* 🟦 Header section with breadcrumb */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-md sticky top-0 z-40"
      >
        <div className="container mx-auto px-6 py-6 md:py-8 max-w-6xl">
          <Breadcrumb />
        </div>
      </motion.header>

      {/* Main content */}
      <main className="container mx-auto px-6 pt-16 md:pt-20 pb-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-[320px_1fr] gap-10"
        >
          {/* LEFT COLUMN — Project metadata */}
          <aside className="space-y-8">
            {/* Image block with vertical credit */}
            <div className="relative">
              {project.imageCredit && (
                <a
                  href={project.imageCreditUrl || '#'}
                  target={project.imageCreditUrl ? '_blank' : undefined}
                  rel={project.imageCreditUrl ? 'noopener noreferrer' : undefined}
                  aria-label={`Image credit: ${project.imageCredit}`}
                  className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 pr-2"
                  style={{ writingMode: 'sideways-lr', textOrientation: 'mixed' }}
                >
                  <span className="text-xs text-slate-400 hover:text-slate-200 transition-colors select-none whitespace-nowrap">
                    © {project.imageCredit}
                  </span>
                </a>
              )}

              <div className="overflow-hidden rounded-xl border border-slate-700 shadow-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              </div>
            </div>

            {/* Info card */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-4">
              <h2 className="text-xl font-semibold text-blue-400">Project Info</h2>

              <div className="flex items-center gap-2 text-slate-300">
                <Calendar size={18} className="text-blue-400" />
                <span>{project.period}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin size={18} className="text-purple-400" />
                <span>{project.location}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700/80 text-slate-200 border border-slate-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-2 text-sm text-slate-400 leading-relaxed">
                <p>
                  <strong className="text-slate-200">Category:</strong>{' '}
                  {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                </p>
                <p>
                  <strong className="text-slate-200">Status:</strong>{' '}
                  {project.status.replace('-', ' ')}
                </p>
                <p>
                  <strong className="text-slate-200">Difficulty:</strong>{' '}
                  {project.difficulty}
                </p>
              </div>

              {project.gitlabUrl ? (
                <a
                  href={project.gitlabUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center w-full px-5 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-medium hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg gap-2"
                >
                  View on GitHub
                  <ExternalLink size={16} />
                </a>
              ) : (
                <p className="text-center text-slate-500 mt-6">Source code not available</p>
              )}
            </div>
          </aside>

          {/* RIGHT COLUMN — Content */}
          <section>
            <div className="mb-10 pt-px"> 
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block tracking-tight
               text-4xl md:text-5xl font-bold
               bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent
               leading-[1.12] pb-1 mb-0"
              >
                {project.title}
              </motion.h1>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">{project.dateCreated}</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="prose prose-invert max-w-none bg-slate-800/50 p-8 rounded-xl border border-slate-700 shadow-lg"
            >
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold text-blue-400 mt-6 mb-3">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold text-white mt-4 mb-2">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-slate-300 leading-relaxed mb-4 text-justify">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside space-y-2 mb-4 text-slate-300 text-justify">
                      {children}
                    </ul>
                  ),
                  li: ({ children }) => <li className="text-slate-300">{children}</li>,
                  strong: ({ children }) => (
                    <strong className="text-white font-semibold">{children}</strong>
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
            </motion.div>
          </section>
        </motion.div>
      </main>

      {/* Floating navigation bar */}
      <FloatingProjectNav projectId={projectId} />
    </div>
  );
};

export default ProjectDetail;
