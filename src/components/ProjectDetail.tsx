import React from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ExternalLink, Calendar, MapPin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  const getProjectData = (id: string) => {
    const projectsData = {
      // Personal Projects
      'home-server': {
        title: t('projects.personalProjects.homeServer.title'),
        description: t('projects.personalProjects.homeServer.description'),
        technologies: t('projects.personalProjects.homeServer.tech') as string[],
        category: 'personal',
        period: '2023 - En cours',
        location: 'Projet personnel',
        image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200',
        gitlabUrl: 'https://gitlab.com/samuel.lecomte37/proxmox-homeserver',
        detailedDescription: `
Ce projet consiste en la mise en place d'un serveur domestique complet basé sur Proxmox VE pour créer une infrastructure cloud familiale sécurisée et autonome.

## Contexte et objectifs

L'objectif était de créer une solution de stockage et de sauvegarde familiale, tout en apprenant les technologies de virtualisation et d'administration système.

## Architecture technique

- Serveur physique avec Proxmox VE comme hyperviseur
- Machine virtuelle TrueNAS pour la gestion du stockage
- Configuration RAID pour la redondance des données
- Accès distant sécurisé via VPN
- Sauvegarde automatisée des données critiques

## Réalisations



- Mise en place d'un cloud familial avec 4TB de stockage
- Configuration de sauvegardes automatiques quotidiennes
- Accès distant sécurisé pour tous les membres de la famille
- Monitoring et alertes en cas de problème matériel`
      },
      'home-automation': {
        title: t('projects.personalProjects.homeAutomation.title'),
        description: t('projects.personalProjects.homeAutomation.description'),
        technologies: t('projects.personalProjects.homeAutomation.tech') as string[],
        category: 'personal',
        period: '2024 - En cours',
        location: 'Domicile',
        image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
        gitlabUrl: 'https://gitlab.com/samuel.lecomte37/home-assistant-config',
        detailedDescription: `
Développement d'un système domotique complet basé sur Home Assistant pour automatiser et contrôler l'ensemble des équipements connectés du domicile.

## Contexte et objectifs

Création d'un écosystème domotique intelligent pour améliorer le confort, la sécurité et l'efficacité énergétique du logement.

## Fonctionnalités implémentées

- Contrôle de l'éclairage intelligent avec scénarios adaptatifs
- Gestion automatisée du chauffage selon la présence et la météo
- Système de sécurité avec détection de mouvement et alertes
- Interface utilisateur personnalisée pour le contrôle à distance

## Technologies et intégrations



- Home Assistant Core avec add-ons personnalisés
- Capteurs Zigbee et Wi-Fi pour la collecte de données
- Automatisations Python pour les scénarios complexes
- Dashboard responsive accessible depuis mobile et desktop`
      },
      // Academic Projects
      'data-analysis': {
        title: t('projects.academicProjects.dataAnalysis.title'),
        description: t('projects.academicProjects.dataAnalysis.description'),
        technologies: t('projects.academicProjects.dataAnalysis.tech') as string[],
        category: 'academic',
        period: 'L3 - 2022',
        location: 'Université Clermont Auvergne',
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200',
        gitlabUrl: 'https://gitlab.com/samuel.lecomte37/data-analysis-l3',
        detailedDescription: `
Projet d'analyse de données appliqué aux simulations du futur collisionneur HL-LHC (High-Luminosity Large Hadron Collider) pour la recherche de nouvelles particules.

## Contexte scientifique

Dans le cadre du cours d'analyse de données de L3, étude des méthodes de filtrage et d'analyse statistique appliquées à la physique des particules.

## Méthodologie

- Traitement de données simulées représentant des collisions proton-proton
- Application de filtres de sélection pour isoler les événements d'intérêt
- Analyse statistique pour estimer la présence d'un hypothétique "boson X"
- Calcul de la significativité statistique des résultats

## Outils et techniques



- Python avec NumPy et Matplotlib pour l'analyse
- Méthodes statistiques avancées (test d'hypothèses, intervalles de confiance)
- Visualisation des distributions et des corrélations
- Rédaction d'un rapport scientifique détaillé`
      },
      'collective-phenomena': {
        title: t('projects.academicProjects.collectivePhenomena.title'),
        description: t('projects.academicProjects.collectivePhenomena.description'),
        technologies: t('projects.academicProjects.collectivePhenomena.tech') as string[],
        category: 'academic',
        period: 'M1 - 2024',
        location: 'Université Clermont Auvergne',
        image: 'https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg?auto=compress&cs=tinysrgb&w=1200',
        gitlabUrl: 'https://gitlab.com/samuel.lecomte37/ising-model',
        detailedDescription: `
Implémentation et étude du modèle d'Ising bidimensionnel pour comprendre les transitions de phase dans les systèmes magnétiques.

## Objectifs pédagogiques

Comprendre les phénomènes collectifs et les transitions de phase à travers la simulation numérique du modèle d'Ising.

## Développement technique

- Implémentation de l'algorithme de Metropolis-Hastings en Python
- Simulation Monte Carlo pour explorer l'espace des configurations
- Calcul de grandeurs thermodynamiques (aimantation, susceptibilité, chaleur spécifique)
- Visualisation en temps réel de l'évolution du système

## Résultats obtenus



- Observation de la transition de phase ferromagnétique-paramagnétique
- Détermination numérique de la température critique
- Analyse des fluctuations et des corrélations spatiales
- Validation des prédictions théoriques du modèle`
      },
      'quantum-mechanics': {
        title: t('projects.academicProjects.quantumMechanics.title'),
        description: t('projects.academicProjects.quantumMechanics.description'),
        technologies: t('projects.academicProjects.quantumMechanics.tech') as string[],
        category: 'academic',
        period: 'M1 - 2024',
        location: 'Université Clermont Auvergne',
        image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1200',
        gitlabUrl: 'https://gitlab.com/samuel.lecomte37/quantum-shor',
        detailedDescription: `
Introduction pratique à l'informatique quantique à travers l'implémentation de l'algorithme de Shor pour la factorisation d'entiers.

## Contexte théorique

Étude des principes fondamentaux de l'informatique quantique et de leurs applications en cryptographie.

## Implémentation technique

- Utilisation de la bibliothèque Cirq de Google pour la simulation quantique
- Implémentation des portes quantiques nécessaires (Hadamard, CNOT, QFT)
- Simulation de l'algorithme de Shor pour factoriser des nombres semi-premiers
- Analyse de la complexité et des avantages quantiques

## Applications cryptographiques



- Démonstration de la vulnérabilité du chiffrement RSA face aux ordinateurs quantiques
- Étude des implications pour la sécurité informatique moderne
- Exploration des solutions de cryptographie post-quantique
- Présentation des enjeux de la course technologique quantique`
      },
      'arduino': {
        title: t('projects.academicProjects.arduino.title'),
        description: t('projects.academicProjects.arduino.description'),
        technologies: t('projects.academicProjects.arduino.tech') as string[],
        category: 'academic',
        period: 'M1 - 2024',
        location: 'Université Clermont Auvergne',
        image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1200',
        gitlabUrl: 'https://gitlab.com/samuel.lecomte37/arduino-weather-station',
        detailedDescription: `
Conception et réalisation d'une station météorologique autonome utilisant la plateforme Arduino et divers capteurs environnementaux.

## Objectifs du projet

Développer une solution IoT complète pour la mesure et l'affichage en temps réel de données météorologiques.

## Composants et capteurs

- Microcontrôleur Arduino Uno comme unité centrale
- Capteur DHT22 pour température et humidité
- Capteur BMP280 pour pression atmosphérique et altitude
- Écran LCD 16x2 pour l'affichage des données
- Module SD pour l'enregistrement historique

## Fonctionnalités développées



- Acquisition de données en temps réel toutes les 30 secondes
- Affichage rotatif des mesures sur écran LCD
- Enregistrement des données sur carte SD avec horodatage
- Calcul de moyennes et détection de tendances
- Interface série pour monitoring et calibration`
      },
      'labview': {
        title: t('projects.academicProjects.labview.title'),
        description: t('projects.academicProjects.labview.description'),
        technologies: t('projects.academicProjects.labview.tech') as string[],
        category: 'academic',
        period: 'M1 - 2024',
        location: 'Université Clermont Auvergne',
        image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1200',
        gitlabUrl: 'https://gitlab.com/samuel.lecomte37/labview-muon-detector',
        detailedDescription: `
Développement d'une interface graphique LabVIEW pour le contrôle et l'analyse de données d'un détecteur de muons cosmiques.

## Contexte expérimental

Les muons cosmiques sont des particules issues des rayons cosmiques qui traversent constamment l'atmosphère terrestre.

## Interface développée

- Panneau de contrôle pour paramétrer l'acquisition de données
- Visualisation en temps réel des signaux détectés
- Analyse automatique des événements muoniques
- Calcul statistique du flux de muons
- Sauvegarde des données dans différents formats

## Fonctionnalités avancées



- Filtrage numérique des signaux pour réduire le bruit
- Détection automatique des coïncidences entre détecteurs
- Histogrammes en temps réel des distributions d'énergie
- Interface utilisateur intuitive avec indicateurs visuels
- Système d'alarmes pour les dysfonctionnements`
      },
      'particle-physics': {
        title: t('projects.academicProjects.particlePhysics.title'),
        description: t('projects.academicProjects.particlePhysics.description'),
        technologies: t('projects.academicProjects.particlePhysics.tech') as string[],
        category: 'academic',
        period: 'M1 - 2024',
        location: 'Université Clermont Auvergne',
        image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1200',
        gitlabUrl: 'https://gitlab.com/samuel.lecomte37/muon-lifetime-analysis',
        detailedDescription: `
Mesure expérimentale du temps de vie des muons cosmiques en utilisant un détecteur dédié et l'analyse de données avec ROOT.

## Principe physique

Les muons sont des particules instables qui se désintègrent avec un temps de vie caractéristique de 2,2 microsecondes.

## Protocole expérimental

- Acquisition de données avec un détecteur de muons à scintillateurs
- Mesure des temps d'arrivée et de désintégration des muons
- Traitement des signaux électroniques et conversion numérique
- Analyse statistique des distributions temporelles

## Analyse avec ROOT



- Importation et nettoyage des données expérimentales
- Ajustement exponentiel des distributions de temps de vie
- Calcul d'incertitudes et validation statistique
- Comparaison avec les valeurs théoriques de référence
- Génération de graphiques et rapports d'analyse`
      }
    };

    return projectsData[id as keyof typeof projectsData] || null;
  };

  const project = projectId ? getProjectData(projectId) : null;

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
                      : 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
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
        </motion.div>
      </main>
    </div>
  );
};

export default ProjectDetail;