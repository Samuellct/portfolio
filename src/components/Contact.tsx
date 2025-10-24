import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Send, Github, Linkedin, CheckCircle, AlertCircle, Share2 } from 'lucide-react';
import en from '../constants/en.json';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const contact = (en as any).contact;
  const formText = contact.form;
  const social = contact.social;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/xpwjbwkb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || formText.error);
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : formText.error2);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const socialLinks = [
    {
      icon: <Github size={20} />,
      label: social.github,
      href: 'https://github.com/Samuellct',
      hoverClass: 'hover:bg-black hover:text-white',
    },
    {
      icon: <Linkedin size={20} />,
      label: social.linkedin,
      href: 'https://www.linkedin.com/in/samuel-lecomte37/',
      hoverClass: 'linkedin-hover',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-center mb-12">Contact me</h2>
          <p className="text-gray-300 text-lg">{contact.subtitle}</p>
        </motion.div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* LEFT SIDE — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center lg:text-left mb-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center lg:justify-start gap-2">
                <Mail size={24} className="text-blue-400" />
                {formText.title}
              </h3>
            </div>

            {/* Success Message */}
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-900/30 border border-green-500/50 rounded-lg flex items-center gap-3"
              >
                <CheckCircle size={20} className="text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-green-400 font-medium">{formText.success}</p>
                  <p className="text-green-300 text-sm">{formText.successDescription}</p>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg flex items-center gap-3"
              >
                <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                <div>
                  <p className="text-red-400 font-medium">{formText.error}</p>
                  <p className="text-red-300 text-sm">{errorMessage}</p>
                </div>
              </motion.div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-gray-900/50 p-8 rounded-lg border border-gray-700 shadow-xl"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    {formText.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder={formText.name}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {formText.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder={formText.email}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  {formText.subject}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder={formText.subject}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  {formText.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder={formText.message}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3 px-6 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed ${
                  isSubmitting
                    ? 'bg-blue-500 text-white opacity-75'
                    : submitStatus === 'success'
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{formText.sending}</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle size={18} />
                    <span>{formText.success}</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>{formText.send}</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* RIGHT SIDE — Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center lg:text-left mb-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center lg:justify-start gap-2">
                <Share2 size={24} className="text-blue-400" />
                Find me on
              </h3>
            </div>

            <div className="bg-gray-900/50 p-8 rounded-lg border border-gray-700 shadow-xl">
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center gap-3 p-4 bg-gray-700/50 text-gray-300 rounded-lg transition-all duration-300 ${social.hoverClass || 'hover:bg-blue-600 hover:text-white'} group`}
                    style={{
                      '--hover-bg': social.hoverStyle?.backgroundColor || undefined,
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      if (social.hoverStyle?.backgroundColor) {
                        (e.target as HTMLElement).style.backgroundColor =
                          social.hoverStyle.backgroundColor;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (social.hoverStyle?.backgroundColor) {
                        (e.target as HTMLElement).style.backgroundColor = '';
                      }
                    }}
                  >
                    <div className="flex-shrink-0">{social.icon}</div>
                    <div>
                      <p className="font-medium group-hover:text-white transition-colors duration-300">
                        {social.label}
                      </p>
                      <p className="text-sm opacity-75">
                        {social.label === 'GitLab'
                          ? 'My projects'
                          : 'Professional profile'}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;