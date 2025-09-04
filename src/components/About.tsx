import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import {
  Download,
} from 'lucide-react';
import {
  SiCplusplus,
  SiPython,
  SiR,
  SiGit,
  SiDocker,
  SiReact,
} from 'react-icons/si';
import { TbMathIntegralX, TbSquareRoot } from 'react-icons/tb';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { t } = useTranslation();

  const technicalSkills = [
    { name: 'C++', icon: <SiCplusplus size={32} />, color: 'from-blue-500 to-blue-600', hoverColor: 'border-blue-400' },
    { name: 'Python', icon: <SiPython size={32} />, color: 'from-yellow-400 to-yellow-500', hoverColor: 'border-yellow-400' },
    { name: 'R', icon: <SiR size={32} />, color: 'from-blue-600 to-blue-700', hoverColor: 'border-blue-500' },
    { name: 'ROOT', icon: <TbSquareRoot size={32} />, color: 'from-blue-400 to-sky-500', hoverColor: 'border-blue-400' },
    { name: 'Git', icon: <SiGit size={32} />, color: 'from-orange-500 to-orange-600', hoverColor: 'border-orange-400' },
    { name: 'Docker', icon: <SiDocker size={32} />, color: 'from-cyan-500 to-cyan-600', hoverColor: 'border-cyan-400' },
    { name: 'React', icon: <SiReact size={32} />, color: 'from-cyan-400 to-blue-500', hoverColor: 'border-cyan-400' },
  ];

  return (
    <section id="about" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            {t('about.title')}
          </h2>

          {/* Top row: Presentation (left) and Goals + Other Skills (right) */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Left column: Presentation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700 h-full">
                <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                  {t('about.presentation')}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {t('about.presentationText')}
                </p>
              </div>
            </motion.div>

            {/* Right column: Goals and Other Skills */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Professional Goals */}
              <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">
                  {t('about.goals')}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {t('about.goalsText')}
                </p>
              </div>

              {/* Other Skills */}
              <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                <h4 className="text-lg font-semibold mb-4 text-green-400">
                  {t('about.otherSkills')}
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {(t('about.otherSkillsList') as string[]).map((skill, index) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                      <span className="text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Technical Skills - Full width row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-semibold mb-8 text-center">
              {t('about.technicalSkills')}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
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
                  className={`group relative bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:${skill.hoverColor} transition-all duration-300 text-center overflow-hidden`}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`} />
                  
                  {/* Icon container with gradient background */}
                  <div className="relative z-10 mb-4 flex justify-center">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${skill.color} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
                      <div className="text-white group-hover:scale-110 transition-transform duration-300">
                        {skill.icon}
                      </div>
                    </div>
                  </div>
                  
                  <span className="relative z-10 text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300">
                    {skill.name}
                  </span>

                  {/* Subtle glow effect on hover */}
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
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              <span>{t('about.downloadCV')}</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;