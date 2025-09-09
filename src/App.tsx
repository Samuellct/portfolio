import React, { useEffect, useState } from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import ProjectListing from './components/ProjectListing';
import BlogCategory from './components/BlogCategory';
import BlogArticle from './components/BlogArticle';
import BlogListing from './components/BlogListing';
import { useLocation } from 'react-router-dom';
import './i18n';

const HomePage: React.FC = () => {
  const location = useLocation();   // récupère l’état passé par navigate

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo === 'blog') {
      // Nettoie l’état pour éviter de re-scroller quand on revient
      window.history.replaceState(null, document.title);
      
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.state]);
	
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="pt-16 md:pt-24">
        <Hero />
        <About />
        <Education />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {

  const { i18n } = useTranslation();

  const RouterComponent = import.meta.env.PROD ? HashRouter : BrowserRouter;
  return (
    <RouterComponent basename={import.meta.env.BASE_URL}>
      <div className="relative">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:projectId" element={<ProjectDetail />} />
            <Route path="/project" element={<ProjectListing />} />
            <Route path="/blog/:categoryId" element={<BlogCategory />} />
            <Route path="/blog/:categoryId/:articleId" element={<BlogArticle />} />
            <Route path="/blog" element={<BlogListing />} />
          </Routes>
        </motion.div>
      </div>
    </RouterComponent>
  );
}

export default App;
