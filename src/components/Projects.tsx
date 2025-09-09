import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  ExternalLink,
  Github,
  Filter,
  Server,
  Home,
  Atom,
  Calculator,
  Cpu,
  BarChart3,
} from 'lucide-react';
// Added missing Code icon import
import { Code } from 'lucide-react';
import { getAllProjects, getProjectPreview } from '../data/projectData';

const Projects: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'academic' | 'personal'>('all');

  // Get projects from centralized data
  const allProjects = getAllProjects();

  const getProjectIcon = (type: string) => {
    switch (type) {
      case 'server':
        return <Server size={24} />;
      case 'home':
        return <Home size={24} />;
      case 'atom':
        return <Atom size={24} />;
      case 'calculator':
        return <Calculator size={24} />;
      case 'cpu':
        return <Cpu size={24} />;
      case 'chart':
        return <BarChart3 size={24} />;
      default:
        return <Code size={24} />;
    }
  };

  // Transform projects data for display
  const projects = allProjects.map(project => ({
    id: project.id,
    title: project.title,
    description: getProjectPreview(project.description),
    technologies: project.technologies,
    category: project.category,
    icon: getIconType(project),
    image: project.image,
  }));

  // Helper function to determine icon type based on project data
  function getIconType(project: any) {
    if (project.technologies.includes('Proxmox') || project.technologies.includes('TrueNAS')) {
      return 'server';
    }
    if (project.technologies.includes('Home Assistant') || project.technologies.includes('IoT')) {
      return 'home';
    }
    if (project.technologies.includes('ROOT') || project.technologies.includes('Physique des particules')) {
      return 'atom';
    }
    if (project.technologies.includes('Arduino') || project.technologies.includes('LabVIEW')) {
      return 'cpu';
    }
    if (project.technologies.includes('Python') && project.technologies.includes('Analyse statistique')) {
      return 'chart';
    }
    return 'code';
  }

  const filteredProjects = projects.filter(
    (project) => filter === 'all' || project.category === filter
  );

  const filterButtons = [
    { key: 'all' as const, label: t('projects.filter.all') },
    { key: 'personal' as const, label: t('projects.filter.personal') },
    { key: 'academic' as const, label: t('projects.filter.academic') },
  ];

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section id="projects" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            {t('projects.title')}
          </h2>

          {/* Internship Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            {(() => {
              const internships = [
                {
                  title: t('projects.internshipProject.title'),
                  period: t('projects.internshipProject.period'),
                  location: t('projects.internshipProject.location'),
                  description: t('projects.internshipProject.description'),
                  tech: t('projects.internshipProject.tech') as string[],
                },
                {
                  title: t('projects.internshipProjectM2.title'),
                  period: t('projects.internshipProjectM2.period'),
                  location: t('projects.internshipProjectM2.location'),
                  description: t('projects.internshipProjectM2.description'),
                  tech: t('projects.internshipProjectM2.tech') as string[],
                },
              ];

              return (
                <div className="grid md:grid-cols-2 gap-6">
                  {internships.map((intern, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-xl border border-blue-500/30"
                    >
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2 text-blue-400">
                          {intern.title}
                        </h3>
                        <p className="text-slate-300 mb-4">
                          {intern.period} • {intern.location}
                        </p>
                        <p className="text-slate-300 max-w-3xl mx-auto mb-4">
                          {intern.description}
                        </p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {intern.tech.map((tech) => (
                            <span
                              key={tech}
                             className="px-3 py-1 bg-sky-400/30 text-cyan-100 text-sm rounded-full border border-indigo-500/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </motion.div>

          {/* Work Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-green-400">
              {t('workExperience.title')}
            </h3>
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-8 rounded-xl border border-green-500/30">
              <div className="grid md:grid-cols-2 gap-6">
                {(t('workExperience.jobs') as any[]).map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 hover:border-green-500/50 transition-all duration-300"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {job.title}
                    </h4>
                    <p className="text-green-400 font-medium mb-1">
                      {job.company}
                    </p>
                    <p className="text-slate-400 text-sm mb-1">
                      {job.period}
                    </p>
                    <p className="text-slate-400 text-sm">
                      {job.location}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          {/* Filter Buttons */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center mb-12"
          >
            <div className="flex bg-slate-800 rounded-lg p-1 border border-slate-700">
              {filterButtons.map((button) => (
                <button
                  key={button.key}
                  onClick={() => setFilter(button.key)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    filter === button.key
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{ y: -10 }}
                onClick={() => handleProjectClick(project.id)}
                className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white">
                      {getProjectIcon(project.icon)}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-blue-600 p-2 rounded-full">
                      <ExternalLink size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        project.category === 'personal'
                          ? 'bg-blue-600/80 text-blue-100'
                          : 'bg-purple-600/80 text-purple-100'
                      }`}
                    >
                      {project.category === 'personal'
                        ? t('projects.filter.personal')
                        : t('projects.filter.academic')}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-slate-700/80 text-xs rounded-full text-white font-medium border border-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
