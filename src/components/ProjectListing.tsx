import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ListFilter as Filter,
  SortAsc,
  SortDesc,
  Grid3x3,
  List,
  Calendar,
  Code,
  ExternalLink,
  Server,
  Home,
  Atom,
  Calculator,
  Cpu,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

import FloatingNav from './FloatingNav';
import Breadcrumb from './Breadcrumb';
import { getAllProjects, getAllTechnologies, ProjectData } from '../data/projectData';
import { Link } from 'react-router-dom';

const ProjectListing: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'difficulty'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const itemsPerPage = 9;

  const projects: ProjectData[] = getAllProjects().filter(
    (p) => p.category !== 'internship'
  );
  const allTechnologies: string[] = getAllTechnologies();

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory;
      const matchesTechnology =
        selectedTechnology === 'all' ||
        project.technologies.includes(selectedTechnology);
      const matchesStatus =
        selectedStatus === 'all' || project.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesTechnology && matchesStatus;
    });

    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'date':
          comparison =
            new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'difficulty':
          const order = { beginner: 1, intermediate: 2, advanced: 3 };
          comparison = order[a.difficulty] - order[b.difficulty];
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [projects, searchTerm, selectedCategory, selectedTechnology, selectedStatus, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedProjects.length / itemsPerPage);
  const paginatedProjects = filteredAndSortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTechnology, selectedStatus]);

  const getProjectIcon = (project: ProjectData) => {
    if (project.technologies.includes('Proxmox') || project.technologies.includes('TrueNAS')) return <Server size={20} />;
    if (project.technologies.includes('Home Assistant') || project.technologies.includes('IoT')) return <Home size={20} />;
    if (project.technologies.includes('ROOT') || project.technologies.includes('Particle Physics')) return <Atom size={20} />;
    if (project.technologies.includes('Arduino') || project.technologies.includes('LabVIEW')) return <Cpu size={20} />;
    if (project.technologies.includes('Python') && project.technologies.includes('Statistical Analysis')) return <BarChart3 size={20} />;
    return <Code size={20} />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'in-progress':
        return <Clock size={16} className="text-yellow-400" />;
      case 'planned':
        return <AlertCircle size={16} className="text-blue-400" />;
      default:
        return null;
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
          <p className="text-lg text-slate-300">Loading projects...</p>
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
                My Projects
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl">
                Explore my academic and personal projects, each reflecting my learning journey and passion for technology.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Filters */}
      <section className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-8"
          >
            <div className="relative mb-6">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search for a project, technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                >
                  <option value="all">All</option>
                  <option value="personal">Personal</option>
                  <option value="academic">Academic</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              {/* Technology */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Technology</label>
                <select
                  value={selectedTechnology}
                  onChange={(e) => setSelectedTechnology(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                >
                  <option value="all">All</option>
                  {allTechnologies.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                >
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="planned">Planned</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Sort by</label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'difficulty')}
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  >
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                    <option value="difficulty">Difficulty</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-300 hover:text-white hover:border-blue-500 transition-all duration-300"
                    aria-label="Change sort order"
                  >
                    {sortOrder === 'asc' ? <SortAsc size={20} /> : <SortDesc size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-400">
                {filteredAndSortedProjects.length} project
                {filteredAndSortedProjects.length !== 1 ? 's' : ''} found
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400 mr-2">View:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
                  }`}
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-400 hover:text-white hover:bg-slate-600'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Projects grid */}
          <AnimatePresence mode="wait">
            {filteredAndSortedProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                <p className="text-slate-400 mb-6">Try adjusting your search filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedTechnology('all');
                    setSelectedStatus('all');
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Reset filters
                </button>
              </motion.div>
            ) : (
              /* cartes projet avec <Link> */
              <motion.div
                key={`${viewMode}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}
              >
                {paginatedProjects.map((project, index) => (
                  <Link key={project.id} to={`/project/${project.id}`} className="block group">
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
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          {getProjectIcon(project)}
                          <div className="absolute bottom-4 right-4 bg-blue-600 p-2 rounded-full">
                            <ExternalLink size={16} className="text-white" />
                          </div>
                        </div>
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {project.featured && (
                            <span className="px-2 py-1 bg-yellow-500/90 text-yellow-900 text-xs rounded-full font-medium">
                              ⭐ Featured
                            </span>
                          )}
                          <div className="flex items-center gap-1 px-2 py-1 bg-slate-900/90 text-white text-xs rounded-full">
                            {getStatusIcon(project.status)}
                            <span className="ml-1 capitalize">{project.status.replace('-', ' ')}</span>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 text-xs rounded-full font-medium ${
                              project.category === 'personal'
                                ? 'bg-blue-600/80 text-blue-100'
                                : project.category === 'academic'
                                ? 'bg-purple-600/80 text-purple-100'
                                : 'bg-green-600/80 text-green-100'
                            }`}
                          >
                            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 flex-1">
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 mb-3">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{project.period}</span>
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, viewMode === 'list' ? 6 : 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-slate-700/80 text-xs rounded-full text-slate-300 font-medium border border-slate-600"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > (viewMode === 'list' ? 6 : 4) && (
                            <span className="px-2 py-1 bg-slate-600/50 text-xs rounded-full text-slate-400 font-medium">
                              +{project.technologies.length - (viewMode === 'list' ? 6 : 4)}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">📍 {project.location}</div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <FloatingNav />
    </div>
  );
};

export default ProjectListing;
