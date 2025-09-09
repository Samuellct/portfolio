export interface ProjectData {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  category: 'personal' | 'academic' | 'internship';
  status: 'completed' | 'in-progress' | 'planned';
  period: string;
  location: string;
  image: string;
  gitlabUrl?: string;
  featured?: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  dateCreated: string;
  keywords: string[];
}

export interface CategoryData {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
  bgGradient: string;
  hoverColor: string;
}

// Utility function to truncate text to specified length with ellipsis
export const truncateText = (text: string, maxLength: number = 150): string => {
  // Remove markdown formatting and extra whitespace
  const cleanText = text
    .replace(/\*\*/g, '') // Remove bold markers
    .replace(/\n\n/g, ' ') // Replace double newlines with space
    .replace(/\n/g, ' ') // Replace single newlines with space
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  // Find the last complete word within the limit
  const truncated = cleanText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  // If we found a space, cut at the last complete word
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  // Otherwise, cut at the character limit
  return truncated + '...';
};

// Get preview text from project description
export const getProjectPreview = (description: string): string => {
  return truncateText(description, 150);
};

// Categories configuration
export const projectCategories: CategoryData[] = [
  {
    id: 'personal',
    title: 'Projets Personnels',
    description: 'Projets développés de manière autonome pour explorer de nouvelles technologies',
    color: 'from-blue-500 to-cyan-500',
    icon: 'User',
    hoverColor: 'hover:border-blue-400/50',
    bgGradient: 'from-blue-900/20 to-cyan-900/20'
  },
  {
    id: 'academic',
    title: 'Projets Académiques',
    description: 'Travaux réalisés dans le cadre de mes études universitaires',
    color: 'from-purple-500 to-violet-500',
    icon: 'GraduationCap',
    hoverColor: 'hover:border-purple-400/50',
    bgGradient: 'from-purple-900/20 to-violet-900/20'
  },
  {
    id: 'internship',
    title: 'Stages & Recherche',
    description: 'Expériences professionnelles et projets de recherche en laboratoire',
    color: 'from-green-500 to-emerald-500',
    icon: 'Briefcase',
    hoverColor: 'hover:border-green-400/50',
    bgGradient: 'from-green-900/20 to-emerald-900/20'
  }
];

// Centralized projects data
export const projectsData: Record<string, Record<string, ProjectData>> = {
  personal: {
    'home-server': {
      id: 'home-server',
      title: 'Serveur Domestique Proxmox',
      description: 'Configuration d\'un serveur Proxmox avec VM TrueNAS pour créer un cloud familial sécurisé. Gestion du stockage, sauvegarde automatique et accès distant.',
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
- Monitoring et alertes en cas de problème matériel`,
      technologies: ['Proxmox', 'TrueNAS', 'Virtualisation', 'Réseau'],
      category: 'personal',
      status: 'completed',
      period: '2023 - En cours',
      location: 'Projet personnel',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gitlabUrl: 'https://gitlab.com/samuel.lecomte37/proxmox-homeserver',
      featured: true,
      difficulty: 'advanced',
      dateCreated: '2023-06-01',
      keywords: ['virtualisation', 'stockage', 'cloud domestique', 'administration système']
    },
    'home-automation': {
      id: 'home-automation',
      title: 'Domotique Home Assistant',
      description: 'Système de domotique basé sur Home Assistant pour contrôler les appareils IoT et automatiser les tâches quotidiennes. Intégration de capteurs, éclairage intelligent et automatisations personnalisées.',
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
- Dashboard responsive accessible depuis mobile et desktop`,
      technologies: ['Home Assistant', 'IoT', 'Python', 'YAML'],
      category: 'personal',
      status: 'in-progress',
      period: '2024 - En cours',
      location: 'Domicile',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      gitlabUrl: 'https://gitlab.com/samuel.lecomte37/home-assistant-config',
      difficulty: 'intermediate',
      dateCreated: '2024-01-15',
      keywords: ['domotique', 'automatisation', 'IoT', 'smart home']
    }
  },
  academic: {
    'data-analysis': {
      id: 'data-analysis',
      title: 'Analyse des Données - L3',
      description: 'Présentation du processus de filtrage de données brutes appliqué aux données simulées du HL-LHC pour estimer la présence d\'un \'boson X\'.',
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
- Rédaction d'un rapport scientifique détaillé`,
      technologies: ['Python', 'Analyse statistique', 'Simulation'],
      category: 'academic',
      status: 'completed',
      period: 'L3 - 2022',
      location: 'Université Clermont Auvergne',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      gitlabUrl: 'https://gitlab.com/samuel.lecomte37/data-analysis-l3',
      difficulty: 'intermediate',
      dateCreated: '2022-03-01',
      keywords: ['physique des particules', 'analyse statistique', 'python', 'simulation']
    },
    'collective-phenomena': {
      id: 'collective-phenomena',
      title: 'Phénomènes Collectifs - M1',
      description: 'Étude du modèle d\'Ising avec écriture d\'un code Python simulant le cas à deux dimensions.',
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
- Validation des prédictions théoriques du modèle`,
      technologies: ['Python', 'Physique statistique', 'Simulation Monte Carlo'],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: 'https://images.pexels.com/photos/355948/pexels-photo-355948.jpeg?auto=compress&cs=tinysrgb&w=800',
      gitlabUrl: 'https://gitlab.com/samuel.lecomte37/ising-model',
      difficulty: 'intermediate',
      dateCreated: '2024-03-01',
      keywords: ['physique statistique', 'modèle d\'ising', 'monte carlo', 'transitions de phase']
    },
    'quantum-mechanics': {
      id: 'quantum-mechanics',
      title: 'Mécanique Quantique - M1',
      description: 'Introduction à l\'informatique quantique et son application à la cryptographie. Simulation Python de l\'algorithme quantique de Shor via la librairie Cirq.',
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
- Présentation des enjeux de la course technologique quantique`,
      technologies: ['Python', 'Cirq', 'Cryptographie quantique'],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
      gitlabUrl: 'https://gitlab.com/samuel.lecomte37/quantum-shor',
      difficulty: 'advanced',
      dateCreated: '2024-02-01',
      keywords: ['informatique quantique', 'algorithme de shor', 'cryptographie', 'cirq']
    },
    'arduino': {
      id: 'arduino',
      title: 'Projet Arduino - M1',
      description: 'Création d\'une station météo composée de plusieurs capteurs et d\'un écran pour visualiser les données.',
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
- Interface série pour monitoring et calibration`,
      technologies: ['Arduino', 'C++', 'Capteurs IoT'],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
      gitlabUrl: 'https://gitlab.com/samuel.lecomte37/arduino-weather-station',
      difficulty: 'beginner',
      dateCreated: '2024-01-01',
      keywords: ['arduino', 'capteurs', 'station météo', 'iot']
    },
    'labview': {
      id: 'labview',
      title: 'Projet LabVIEW - M1',
      description: 'Développement d\'un environnement LabVIEW pour contrôler un détecteur à muons avec analyse graphique des données.',
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
- Système d'alarmes pour les dysfonctionnements`,
      technologies: ['LabVIEW', 'Acquisition de données', 'Interface graphique'],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
      gitlabUrl: 'https://gitlab.com/samuel.lecomte37/labview-muon-detector',
      difficulty: 'intermediate',
      dateCreated: '2024-01-15',
      keywords: ['labview', 'acquisition de données', 'muons cosmiques', 'interface graphique']
    },
    'particle-physics': {
      id: 'particle-physics',
      title: 'Physique des Particules - M1',
      description: 'Acquisition de données via un détecteur à muons et analyse avec ROOT pour déterminer le temps de vie des muons.',
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
- Génération de graphiques et rapports d'analyse`,
      technologies: ['ROOT', 'C++', 'Analyse statistique'],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
      gitlabUrl: 'https://gitlab.com/samuel.lecomte37/muon-lifetime-analysis',
      difficulty: 'advanced',
      dateCreated: '2024-02-15',
      keywords: ['physique des particules', 'root', 'muons', 'analyse statistique']
    }
  },
  internship: {
    'internship-m1': {
      id: 'internship-m1',
      title: 'Stage de Master 1 LPCA - Équipe LHCb',
      description: 'Étude d\'un mode de désintégration rare du méson B. Développement de scripts d\'analyse de données avec ROOT pour le Run I de LHCb.',
      detailedDescription: `
Stage de recherche au Laboratoire de Physique Corpusculaire et d'Astrophysique (LPCA) dans l'équipe LHCb pour l'étude des désintégrations rares de mésons B.

## Contexte scientifique

L'expérience LHCb au CERN étudie la violation de CP et les désintégrations rares de hadrons beaux pour rechercher une physique au-delà du Modèle Standard.

## Objectifs du stage

- Analyser un mode de désintégration rare du méson B
- Développer des outils d'analyse de données avec ROOT
- Optimiser les critères de sélection des événements
- Estimer les bruits de fond et calculer les rapports d'embranchement

## Réalisations techniques

- Développement de scripts C++/ROOT pour l'analyse de données
- Implémentation d'algorithmes de sélection d'événements
- Analyse statistique des distributions de masse invariante
- Validation des résultats par comparaison avec la littérature

## Résultats obtenus

- Mise en évidence du signal recherché dans les données du Run I
- Estimation précise du bruit de fond combinatoire
- Calcul du rapport d'embranchement avec incertitudes statistiques
- Présentation des résultats à l'équipe de recherche`,
      technologies: ['ROOT', 'C++', 'Analyse de données', 'Physique des particules'],
      category: 'internship',
      status: 'completed',
      period: 'Avril - Juin 2024',
      location: 'Aubière (63170)',
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
      difficulty: 'advanced',
      dateCreated: '2024-04-01',
      keywords: ['lhcb', 'physique des particules', 'root', 'analyse de données']
    },
    'internship-m2': {
      id: 'internship-m2',
      title: 'Stage de Master 2 LPCA - Équipe ATLAS',
      description: 'Génération et analyse d\'événements simulés pour évaluer la faisabilité de recherches de particules à longue durée de vie (LLP) au HL-LHC.',
      detailedDescription: `
Stage de recherche au LPCA dans l'équipe ATLAS pour l'étude de la faisabilité de recherches de particules à longue durée de vie au futur HL-LHC.

## Contexte scientifique

Les particules à longue durée de vie (LLP) sont prédites par de nombreux modèles de physique au-delà du Modèle Standard et constituent une signature expérimentale distinctive.

## Objectifs du stage

- Générer des événements simulés de production de LLP
- Analyser les signatures expérimentales dans le détecteur ATLAS
- Optimiser les stratégies de déclenchement et de reconstruction
- Estimer les performances de détection au HL-LHC

## Méthodologie

- Génération d'événements avec MadGraph pour différents scénarios HAHM
- Simulation de la réponse du détecteur avec les outils ATLAS
- Développement d'algorithmes de reconstruction des vertex déplacés
- Analyse statistique des distributions cinématiques

## Technologies utilisées

- MadGraph pour la génération d'événements Monte Carlo
- Pythia pour la simulation de la gerbe partonique
- Rivet pour l'analyse phénoménologique
- Outils de développement Git et Docker pour la collaboration

## Résultats attendus

- Caractérisation des signatures LLP dans ATLAS
- Optimisation des critères de sélection
- Estimation de l'acceptance et de l'efficacité de détection
- Évaluation du potentiel de découverte au HL-LHC`,
      technologies: ['MadGraph', 'Pythia', 'Rivet', 'C++', 'git & docker'],
      category: 'internship',
      status: 'in-progress',
      period: 'Février - Juillet 2025',
      location: 'Aubière (63170)',
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      difficulty: 'advanced',
      dateCreated: '2025-02-01',
      keywords: ['atlas', 'particules longue durée de vie', 'hl-lhc', 'simulation']
    }
  }
};

// Categories data
export const categoriesData: Record<string, CategoryData> = {
  personal: {
    id: 'personal',
    title: 'Projets Personnels',
    description: 'Projets développés de manière autonome pour explorer de nouvelles technologies',
    color: 'from-blue-500 to-cyan-500',
    icon: 'User',
    hoverColor: 'hover:border-blue-400/50',
    bgGradient: 'from-blue-900/20 to-cyan-900/20'
  },
  academic: {
    id: 'academic',
    title: 'Projets Académiques',
    description: 'Travaux réalisés dans le cadre de mes études universitaires',
    color: 'from-purple-500 to-violet-500',
    icon: 'GraduationCap',
    hoverColor: 'hover:border-purple-400/50',
    bgGradient: 'from-purple-900/20 to-violet-900/20'
  },
  internship: {
    id: 'internship',
    title: 'Stages & Recherche',
    description: 'Expériences professionnelles et projets de recherche en laboratoire',
    color: 'from-green-500 to-emerald-500',
    icon: 'Briefcase',
    hoverColor: 'hover:border-green-400/50',
    bgGradient: 'from-green-900/20 to-emerald-900/20'
  }
};

// Helper functions
export const getProjectById = (categoryId: string, projectId: string): ProjectData | null => {
  return projectsData[categoryId]?.[projectId] || null;
};

export const getProjectsByCategory = (categoryId: string): ProjectData[] => {
  const categoryProjects = projectsData[categoryId];
  return categoryProjects ? Object.values(categoryProjects) : [];
};

export const getCategoryById = (categoryId: string): CategoryData | null => {
  return categoriesData[categoryId] || null;
};

export const getAllCategories = (): CategoryData[] => {
  return Object.values(categoriesData);
};

export const getAllProjects = (): ProjectData[] => {
  const allProjects: ProjectData[] = [];
  
  Object.keys(projectsData).forEach(categoryId => {
    Object.values(projectsData[categoryId]).forEach(project => {
      allProjects.push(project);
    });
  });
  
  return allProjects;
};

// Get latest project based on dateCreated
export const getLatestProject = (): ProjectData | null => {
  const allProjects = getAllProjects();
  if (allProjects.length === 0) return null;
  
  return allProjects.reduce((latest, current) => {
    return new Date(current.dateCreated) > new Date(latest.dateCreated) ? current : latest;
  });
};

// Get featured projects
export const getFeaturedProjects = (): ProjectData[] => {
  return getAllProjects().filter(project => project.featured);
};

// Get projects by status
export const getProjectsByStatus = (status: 'completed' | 'in-progress' | 'planned'): ProjectData[] => {
  return getAllProjects().filter(project => project.status === status);
};

// Get projects by difficulty
export const getProjectsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced'): ProjectData[] => {
  return getAllProjects().filter(project => project.difficulty === difficulty);
};

// Search projects by keyword
export const searchProjects = (query: string): ProjectData[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllProjects().filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
    project.technologies.some(tech => tech.toLowerCase().includes(lowercaseQuery))
  );
};

// Get related projects based on technologies and category
export const getRelatedProjects = (currentProjectId: string, categoryId: string, maxResults: number = 3): ProjectData[] => {
  const allProjects = getAllProjects();
  
  // Filter out current project
  const otherProjects = allProjects.filter(project => project.id !== currentProjectId);
  
  // Get current project for comparison
  const currentProject = getProjectById(categoryId, currentProjectId);
  if (!currentProject) return [];
  
  // Score projects based on relevance
  const scoredProjects = otherProjects.map(project => {
    let score = 0;
    
    // Same category gets highest priority
    if (project.category === currentProject.category) {
      score += 10;
    }
    
    // Check for common technologies
    const currentTechs = currentProject.technologies.map(t => t.toLowerCase());
    const projectTechs = project.technologies.map(t => t.toLowerCase());
    
    projectTechs.forEach(tech => {
      if (currentTechs.includes(tech)) {
        score += 5;
      }
    });
    
    // Check for common keywords
    const currentKeywords = currentProject.keywords.map(k => k.toLowerCase());
    const projectKeywords = project.keywords.map(k => k.toLowerCase());
    
    projectKeywords.forEach(keyword => {
      if (currentKeywords.includes(keyword)) {
        score += 3;
      }
    });
    
    // Same difficulty level
    if (project.difficulty === currentProject.difficulty) {
      score += 2;
    }
    
    return { project, score };
  });
  
  // Sort by score (highest first) and return top results
  return scoredProjects
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.project);
};

// Get unique technologies across all projects
export const getAllTechnologies = (): string[] => {
  const technologies = new Set<string>();
  getAllProjects().forEach(project => {
    project.technologies.forEach(tech => technologies.add(tech));
  });
  return Array.from(technologies).sort();
};

// Get unique keywords across all projects
export const getAllKeywords = (): string[] => {
  const keywords = new Set<string>();
  getAllProjects().forEach(project => {
    project.keywords.forEach(keyword => keywords.add(keyword));
  });
  return Array.from(keywords).sort();
};