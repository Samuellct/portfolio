import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';

const Education: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  const { t } = useTranslation();

  const educationData = [
    {
      title: t('education.master.title'),
      school: t('education.master.school'),
      period: t('education.master.period'),
      location: t('education.master.location'),
      current: false,
    },

    {
      title: t('education.du.title'),
      school: t('education.du.school'),
      period: t('education.du.period'),
      location: t('education.du.location'),
      current: false,
    },

    {
      title: t('education.bachelor.title'),
      school: t('education.bachelor.school'),
      period: t('education.bachelor.period'),
      location: t('education.bachelor.location'),
      current: false,
    },
    {
      title: t('education.bac.title'),
      school: t('education.bac.school'),
      period: t('education.bac.period'),
      location: t('education.bac.location'),
      current: false,
    },
  ];

  return (
    <section id="education" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            {t('education.title')}
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block" />

            <div className="space-y-8">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-900 hidden md:block" />

                  <div className="md:ml-20 bg-slate-800/50 p-8 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white mb-2 md:mb-0 md:flex-1 md:pr-4">
                        {edu.title}
                        {edu.current && (
                          <span className="ml-3 px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full">
                            En cours
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 md:flex-shrink-0 md:min-w-max">
                        <Calendar size={16} />
                        <span className="text-sm">{edu.period}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300 mb-2">
                      <GraduationCap size={18} />
                      <span className="font-medium">{edu.school}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin size={16} />
                      <span className="text-sm">{edu.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
