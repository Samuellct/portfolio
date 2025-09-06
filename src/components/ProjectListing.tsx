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
  Code,
  ExternalLink,
  Server,
  Home,
  Atom,
  Calculator,
  Cpu,
  BarChart3,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import FloatingNav from './FloatingNav';
import Breadcrumb from './Breadcrumb';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: 'personal' | 'academic' | 'internship';
  status: 'completed' | 'in-progress' | 'planned';
  period: string;
  location: string;
  image: string;
  featured?: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  dateCreated: string;
}

const ProjectListing: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // State management
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Project data (in a real app, this would come from an API)
  const projects: Project[] = [
    {
      id: 'home-server',
      title: t('projects.personalProjects.homeServer.title'),
      description: t('projects.personalProjects.homeServer.description'),
      technologies: t('projects.personalProjects.homeServer.tech') as string[],
      category: 'personal',
      status: 'completed',
      period: '2023 - En cours',
      location: 'Projet personnel',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      difficulty: 'advanced',
      dateCreated: '2023-06-01'
    },
    {
      id: 'home-automation',
      title: t('projects.personalProjects.homeAutomation.title'),
      description: t('projects.personalProjects.homeAutomation.description'),
      technologies: t('projects.personalProjects.homeAutomation.tech') as string[],
      category: 'personal',
      status: 'in-progress',
      period: '2024 - En cours',
      location: 'Domicile',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      difficulty: 'intermediate',
      dateCreated: '2024-01-15'
    },
    {
      id: 'internship-m2',
      title: t('projects.internshipProjectM2.title'),
      description: t('projects.internshipProjectM2.description'),
      technologies: t('projects.internshipProjectM2.tech') as string[],
      category: 'internship',
      status: 'in-progress',
      period: t('projects.internshipProjectM2.period'),
      location: t('projects.internshipProjectM2.location'),
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      difficulty: 'advanced',
      dateCreated: '2025-02-01'
    },
    {
      id: 'internship-m1',
      title: t('projects.internshipProject.title'),
      description: t('projects.internshipProject.description'),
      technologies: t('projects.internshipProject.tech') as string[],
      category: 'internship',
      status: 'completed',
      period: t('projects.internshipProject.period'),
      location: t('projects.internshipProject.location'),
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
      difficulty: 'advanced',
      dateCreated: '2024-04-01'
    },
    {
      id: 'data-analysis',
      title: t('projects.academicProjects.dataAnalysis.title'),
      description: t('projects.academicProjects.dataAnalysis.description'),
      technologies: t('projects.academicProjects.dataAnalysis.tech') as string[],
      category: 'academic',
      status: 'completed',
      period: 'L3 - 2022',
      location: 'Université Clermont Auvergne',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      difficulty: 'intermediate',
      dateCreated: '2022-03-01'
    },
    {
      id: 'quantum-mechanics',
      title: t('projects.academicProjects.quantumMechanics.title'),
      description: t('projects.academicProjects.quantumMechanics.description'),
      technologies: t('projects.academicProjects.quantumMechanics.tech') as string[],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
      difficulty: 'advanced',
      dateCreated: '2024-02-01'
    },
    {
      id: 'arduino',
      title: t('projects.academicProjects.arduino.title'),
      description: t('projects.academicProjects.arduino.description'),
      technologies: t('projects.academicProjects.arduino.tech') as string[],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
      difficulty: 'beginner',
      dateCreated: '2024-01-01'
    },
    {
      id: 'collective-phenomena',
      title: t('projects.academicProjects.collectivePhenomena.title'),
      description: t('projects.academicProjects.collectivePhenomena.description'),
      technologies: t('projects.academicProjects.collectivePhenomena.tech') as string[],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: 'https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg?auto=compress&cs=tinysrgb&w=800',
      difficulty: 'intermediate',
      dateCreated: '2024-03-01'
    }
  ];

  // Get unique technologies for filter
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [projects]);

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesTechnology = selectedTechnology === 'all' || project.technologies.includes(selectedTechnology);
      const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesTechnology && matchesStatus;
    });

    // Sort projects
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'difficulty':
          const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
          comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [projects, searchTerm, selectedCategory, selectedTechnology, selectedStatus, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProjects.length / itemsPerPage);
  const paginatedProjects = filteredAndSortedProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedTechnology, selectedStatus]);

  const getProjectIcon = (project: Project) => {
    if (project.technologies.includes('Proxmox') || project.technologies.includes('TrueNAS')) {
      return <Server size={20} />;
    }
    if (project.technologies.includes('Home Assistant') || project.technologies.includes('IoT')) {
      return <Home size={20} />;
    }
    if (project.technologies.includes('ROOT') || project.technologies.includes('Physique des particules')) {
      return <Atom size={20} />;
    }
    if (project.technologies.includes('Arduino') || project.technologies.includes('LabVIEW')) {
      return <Cpu size={20} />;
    }
    if (project.technologies.includes('Python') && project.technologies.includes('Analyse statistique')) {
      return <BarChart3 size={20} />;
    }
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
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
          <p className="text-lg text-slate-300">Chargement des projets...</p>
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
                Mes Projets
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl">
                Découvrez l'ensemble de mes réalisations académiques, personnelles et professionnelles. 
                Chaque projet reflète mon parcours d'apprentissage et ma passion pour la technologie.
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
                placeholder="Rechercher un projet, une technologie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                aria-label="Rechercher des projets"
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
                  <option value="personal">Personnel</option>
                  <option value="academic">Académique</option>
                  <option value="internship">Stage</option>
                </select>
              </div>

              {/* Technology Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Technologie</label>
                <select
                  value={selectedTechnology}
                  onChange={(e) => setSelectedTechnology(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  aria-label="Filtrer par technologie"
                >
                  <option value="all">Toutes</option>
                  {allTechnologies.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Statut</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  aria-label="Filtrer par statut"
                >
                  <option value="all">Tous</option>
                  <option value="completed">Terminé</option>
                  <option value="in-progress">En cours</option>
                  <option value="planned">Planifié</option>
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Trier par</label>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'difficulty')}
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                    aria-label="Critère de tri"
                  >
                    <option value="date">Date</option>
                    <option value="title">Titre</option>
                    <option value="difficulty">Difficulté</option>
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
            </div>

            {/* View Mode and Results Count */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-400">
                {filteredAndSortedProjects.length} projet{filteredAndSortedProjects.length !== 1 ? 's' : ''} trouvé{filteredAndSortedProjects.length !== 1 ? 's' : ''}
              </div>
              
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
          </motion.div>

          {/* Projects Grid/List */}
          <AnimatePresence mode="wait">
            {filteredAndSortedProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">Aucun projet trouvé</h3>
                <p className="text-slate-400 mb-6">Essayez de modifier vos critères de recherche</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedTechnology('all');
                    setSelectedStatus('all');
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
                {paginatedProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    onClick={() => handleProjectClick(project.id)}
                    className={`bg-slate-800/50 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group overflow-hidden ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleProjectClick(project.id);
                      }
                    }}
                    aria-label={`Voir le projet ${project.title}`}
                  >
                    {/* Project Image */}
                    <div className={`relative overflow-hidden ${
                      viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-48'
                    }`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white">
                          {getProjectIcon(project)}
                        </div>
                        <div className="absolute bottom-4 right-4 bg-blue-600 p-2 rounded-full">
                          <ExternalLink size={16} className="text-white" />
                        </div>
                      </div>
                      
                      {/* Status and Featured Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {project.featured && (
                          <span className="px-2 py-1 bg-yellow-500/90 text-yellow-900 text-xs rounded-full font-medium">
                            ⭐ Mis en avant
                          </span>
                        )}
                        <div className="flex items-center gap-1 px-2 py-1 bg-slate-900/90 text-white text-xs rounded-full">
                          {getStatusIcon(project.status)}
                          <span className="ml-1">
                            {project.status === 'completed' ? 'Terminé' : 
                             project.status === 'in-progress' ? 'En cours' : 'Planifié'}
                          </span>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                          project.category === 'personal' ? 'bg-blue-600/80 text-blue-100' :
                          project.category === 'academic' ? 'bg-purple-600/80 text-purple-100' :
                          'bg-green-600/80 text-green-100'
                        }`}>
                          {project.category === 'personal' ? 'Personnel' :
                           project.category === 'academic' ? 'Académique' : 'Stage'}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                          {project.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full border font-medium ml-2 flex-shrink-0 ${getDifficultyColor(project.difficulty)}`}>
                          {project.difficulty === 'beginner' ? 'Débutant' :
                           project.difficulty === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{project.period}</span>
                        </div>
                      </div>

                      <p className="text-slate-400 text-sm mb-4 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
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

                      {/* Project Location */}
                      <div className="text-xs text-slate-500">
                        📍 {project.location}
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

export default ProjectListing;