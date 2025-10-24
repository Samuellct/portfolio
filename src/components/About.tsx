import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Download,
  Atom,
  Code,
  FileText,
  Zap,
  Users,
  Rocket,
} from 'lucide-react';
import {
  SiCplusplus,
  SiPython,
  SiR,
  SiGit,
  SiTypescript,
  SiLatex,
  SiArduino,
} from 'react-icons/si';
import en from '../constants/en.json'; // ✅ import direct du dictionnaire anglais

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [activeTimeline, setActiveTimeline] = useState<number>(0);

  const t = en.about; // ✅ raccourci local

  const technicalSkills = [
    { name: 'Arduino', icon: <SiArduino size={32} />, color: 'from-teal-500 to-cyan-500', hoverColor: 'border-teal-400' },
    { name: 'C++', icon: <SiCplusplus size={32} />, color: 'from-blue-500 to-blue-600', hoverColor: 'border-blue-400' },
    { name: 'Python', icon: <SiPython size={32} />, color: 'from-yellow-400 to-yellow-500', hoverColor: 'border-yellow-400' },
    { name: 'R', icon: <SiR size={32} />, color: 'from-blue-600 to-blue-700', hoverColor: 'border-blue-500' },
    { name: 'TypeScript', icon: <SiTypescript size={32} />, color: 'from-blue-400 to-blue-500', hoverColor: 'border-blue-400' },
    { name: 'LaTeX', icon: <SiLatex size={32} />, color: 'from-green-600 to-green-700', hoverColor: 'border-green-500' },
    { name: 'Git', icon: <SiGit size={32} />, color: 'from-orange-500 to-orange-600', hoverColor: 'border-orange-400' },
  ];

  const quickStats = [
    { number: '2', label: t.stats.experiments, icon: <Atom className="w-6 h-6" />, color: 'from-blue-500 to-cyan-500' },
    { number: '6+', label: t.stats.languages, icon: <Code className="w-6 h-6" />, color: 'from-orange-500 to-red-500' },
    { number: '20+', label: t.stats.reports, icon: <FileText className="w-6 h-6" />, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <section id="about" className="py-20 bg-slate-800/50 relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            {t.title}
          </h2>

          {/* Hero Introduction + Quick Stats */}
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {/* Main Story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700 h-full backdrop-blur-sm relative overflow-hidden group hover:border-blue-500/50 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {t.heroIntro.hook}
                    </h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {t.heroIntro.story}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              {quickStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">{stat.number}</div>
                      <div className="text-sm text-slate-400">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Goals + Other Skills Row */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700 h-full backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="w-6 h-6 text-orange-400" />
                  <h3 className="text-xl font-semibold text-orange-400">
                    {t.goals}
                  </h3>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  {t.goalsText}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="bg-slate-900/50 p-8 rounded-lg border border-slate-700 h-full backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-green-400" />
                  <h4 className="text-lg font-semibold text-green-400">
                    {t.otherSkills}
                  </h4>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-slate-300">
                  {t.otherSkillsList.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 1.1 + index * 0.05 }}
                      className="flex items-center gap-3 text-slate-300 group"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
                      <span className="text-sm group-hover:text-white transition-colors duration-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold mb-8 text-center">
              {t.technicalSkills}
            </h3>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  className={`group relative bg-slate-900/50 p-6 md:p-8 rounded-xl border border-slate-700 hover:${skill.hoverColor} transition-all duration-300 overflow-hidden w-28 md:w-32 flex-shrink-0`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />
                  <div className="relative z-10 mb-3 md:mb-4 flex justify-center items-center">
                    <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br ${skill.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
                      <div className="text-white group-hover:scale-110 transition-transform duration-300 text-xl md:text-2xl">
                        {skill.icon}
                      </div>
                    </div>
                  </div>
                  <div className="relative z-10 flex justify-center items-center">
                    <span className="text-xs md:text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300 leading-tight text-center">
                      {skill.name}
                    </span>
                  </div>
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${skill.color} blur-xl`} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CV Download Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-center"
          >
            <motion.a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className="relative inline-flex items-center justify-center gap-3 px-8 py-3 text-lg font-medium text-white
               bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full
               shadow-md shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-400/40
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 group"
            >
              <Download size={20} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>{t.downloadCV}</span>

              {/* Subtle glow layer on hover */}
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-0 blur-[2px] transition-opacity duration-300 group-hover:opacity-20"></span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
