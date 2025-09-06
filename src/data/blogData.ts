export interface ArticleData {
  id: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  imageCaption: string;
  author: string;
  category: string;
  keywords: string[];
  likes: number;
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

// Get preview text from article content
export const getArticlePreview = (content: string): string => {
  return truncateText(content, 150);
};

// Categories configuration
export const blogCategories: CategoryData[] = [
  {
    id: 'adventures',
    title: 'Aventures & Défis',
    description: 'Récits de courses en montagne, événements sportifs marquants et défis personnels',
    color: 'from-emerald-500 to-teal-500',
    icon: 'Mountain',
    hoverColor: 'hover:border-emerald-400/50',
    bgGradient: 'from-emerald-900/20 to-teal-900/20'
  },
  {
    id: 'science',
    title: 'Science & Découvertes',
    description: 'Discussions sur les résultats scientifiques récents et perspectives en physique',
    color: 'from-violet-500 to-purple-500',
    icon: 'Microscope',
    hoverColor: 'hover:border-violet-400/50',
    bgGradient: 'from-violet-900/20 to-purple-900/20'
  },
  {
    id: 'tech',
    title: 'Tech & Implémentations',
    description: 'Tutoriels détaillés et documentation technique de mes projets',
    color: 'from-cyan-500 to-blue-500',
    icon: 'Code2',
    hoverColor: 'hover:border-cyan-400/50',
    bgGradient: 'from-cyan-900/20 to-blue-900/20'
  }
];

// Centralized articles data
export const articlesData: Record<string, Record<string, ArticleData>> = {
  science: {
    'computing-centers-physics': {
      id: 'computing-centers-physics',
      title: 'L\'utilité des centres de calcul en physique des particules',
      content: `La physique des particules est un domaine où l'infiniment petit se conjugue avec l'infiniment complexe. Les expériences menées dans les grands accélérateurs, comme le **LHC** (Large Hadron Collider) au CERN, produisent des quantités colossales de données. Ces données ne peuvent pas être traitées sur un ordinateur classique, ni même sur un cluster de laboratoire de taille moyenne. C'est ici que les centres de calcul entrent en scène : véritables piliers invisibles de la recherche moderne, ils rendent possible l'analyse et l'interprétation de phénomènes fondamentaux de la nature.

Lorsqu'une collision entre particules a lieu dans un détecteur, des millions d'événements sont enregistrés en une fraction de seconde. Les expériences du LHC produisent **plusieurs dizaines de pétaoctets de données par an**. Sans une infrastructure spécialisée, ces informations resteraient inexploitées, rendant tout l'investissement expérimental vain. Les centres de calcul permettent non seulement de stocker ces données massives, mais aussi de les organiser et de les rendre accessibles aux milliers de chercheurs impliqués dans les collaborations internationales.

## Architecture distribuée

Pour répondre à cette demande titanesque, la communauté scientifique a mis en place des architectures de calcul distribuées. Le plus emblématique est la **Grille de calcul mondiale du LHC** (*Worldwide LHC Computing Grid*), un réseau de centres répartis sur plusieurs continents. Chaque centre contribue en capacité de stockage et en puissance de calcul, ce qui permet de répartir la charge et d'éviter la centralisation sur un seul site. Cette approche décentralisée a l'avantage de renforcer la résilience du système et de favoriser la collaboration entre institutions.

## Traitement des données

Stocker les données est une étape essentielle, mais ce n'est que le début. L'analyse des événements exige des ressources considérables. Les chercheurs développent des algorithmes capables de distinguer, parmi un océan de bruit de fond, quelques signaux caractéristiques qui pourraient révéler une nouvelle particule ou confirmer une théorie. Exécuter ces algorithmes sur des milliards d'événements nécessite une puissance de calcul équivalente à des centaines de milliers de cœurs de processeur fonctionnant en parallèle. Sans ces centres, impossible de passer au crible de telles montagnes de données.

## Impact et perspectives

Les centres de calcul ne sont pas que des salles remplies de serveurs. Ils incarnent aussi un savoir-faire technologique et organisationnel. Maintenir des infrastructures capables de tourner 24h/24 demande une expertise pointue en administration système, en réseaux et en cybersécurité. En parallèle, il faut coordonner des équipes de chercheurs, d'ingénieurs et de techniciens à travers le monde. Le fonctionnement fluide d'un centre de calcul est donc autant un défi humain qu'un défi technologique.

L'utilité des centres de calcul dépasse largement le champ de la physique des particules. Les innovations mises en place pour gérer ces données extrêmes bénéficient à d'autres domaines : climatologie, biologie computationnelle, imagerie médicale, ou encore intelligence artificielle. La logique de calcul distribué et de gestion de données massives est désormais un socle de la recherche moderne dans son ensemble.`,
      date: '10 Janvier 2025',
      readTime: '6 min',
      image: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1200',
      imageCaption: 'Centre de calcul haute performance - Infrastructure moderne pour la recherche scientifique',
      author: 'Samuel Lecomte',
      category: 'Physique computationnelle',
      keywords: ['physique des particules', 'centres de calcul', 'big data scientifique', 'technologies distribuées'],
      likes: 42
    }
  },
  adventures: {
    'trail-mont-blanc': {
      id: 'trail-mont-blanc',
      title: 'Trail du Mont-Blanc : 42km de défi personnel',
      content: `Le Trail du Mont-Blanc représente l'un des défis les plus emblématiques du trail running européen. Cette course mythique de 42 kilomètres traverse trois pays - France, Italie et Suisse - en offrant des panoramas à couper le souffle sur le massif du Mont-Blanc.

## La préparation : un engagement total

La préparation pour cette course a commencé six mois avant l'événement. Mon programme d'entraînement s'articulait autour de trois axes principaux : le développement de l'endurance, le renforcement musculaire spécifique à la montagne, et l'acclimatation à l'altitude.

Les sorties longues en montagne étaient programmées chaque weekend, avec des dénivelés progressifs allant de 800m à plus de 2000m. L'objectif était de habituer le corps aux contraintes spécifiques du trail :

- Descentes techniques
- Montées soutenues  
- Changements d'altitude répétés

## Le jour J : gestion de l'effort et stratégie

Le départ a lieu à 6h du matin depuis Chamonix. La stratégie était claire : partir prudemment pour économiser l'énergie sur la première moitié, puis accélérer progressivement si les sensations le permettaient.

Les premiers kilomètres traversent la vallée de Chamonix avant d'attaquer la montée vers le refuge de la Flégère. Cette première ascension de 1200m de dénivelé positif constitue un test crucial pour évaluer ses sensations du jour.

## Les moments clés du parcours

Le passage au col des Montets marque la frontière avec la Suisse. C'est également le point le plus haut du parcours à 1461m d'altitude. La vue sur le glacier d'Argentière est saisissante, mais il faut résister à la tentation de s'arrêter trop longtemps.

La descente vers Vallorcine est technique et demande une concentration maximale. Les pierres humides et les racines glissantes constituent autant de pièges pour les chevilles fatiguées.

## L'arrivée et les enseignements












Franchir la ligne d'arrivée après 4h32 d'effort a été un moment d'émotion intense. Au-delà de la performance chronométrique, cette course m'a appris l'importance de la patience et de la régularité dans l'effort.

Cette expérience confirme que le trail en montagne est autant un défi physique qu'un exercice de gestion mentale. Chaque course apporte ses enseignements et nourrit la motivation pour les prochains défis.`,
      date: '15 Mars 2024',
      readTime: '8 min',
      image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=1200',
      imageCaption: 'Vue panoramique sur le massif du Mont-Blanc depuis le sentier de trail',
      author: 'Samuel Lecomte',
      category: 'Trail',
      keywords: ['trail running', 'mont-blanc', 'course en montagne', 'endurance'],
      likes: 28
    }
  },
  tech: {
    'proxmox-setup': {
      id: 'proxmox-setup',
      title: 'Configuration complète d\'un serveur Proxmox domestique',
      content: `Proxmox Virtual Environment (VE) est une solution de virtualisation open-source qui permet de créer et gérer des machines virtuelles et des conteneurs sur une même plateforme. Dans cet article, je détaille la mise en place complète d'un serveur Proxmox domestique.

## Prérequis matériels et logiciels

Pour ce projet, j'ai utilisé un serveur Dell PowerEdge T30 équipé d'un processeur Intel Xeon E3-1225 v5, 16 GB de RAM DDR4 et deux disques durs de 2 TB en configuration RAID 1 pour la redondance.

Le choix du matériel est crucial : Proxmox nécessite au minimum 2 GB de RAM, mais je recommande fortement 8 GB minimum pour un usage confortable. Le processeur doit supporter la virtualisation matérielle (Intel VT-x ou AMD-V).

## Installation de Proxmox VE

L'installation se fait via une image ISO bootable téléchargeable gratuitement sur le site officiel. Le processus d'installation est guidé et relativement simple :

1. Création de la clé USB bootable avec l'image Proxmox
2. Configuration du BIOS pour activer la virtualisation
3. Boot sur la clé USB et lancement de l'installateur
4. Configuration réseau et partitionnement des disques

## Configuration post-installation

Une fois Proxmox installé, l'interface web est accessible via \`https://IP-DU-SERVEUR:8006\`. La première étape consiste à configurer les dépôts pour les mises à jour et à créer un pool de stockage.

La configuration réseau mérite une attention particulière. J'ai opté pour un bridge Linux (vmbr0) qui permet aux machines virtuelles d'accéder directement au réseau local. Cette configuration facilite l'accès aux services hébergés depuis d'autres appareils du réseau.

### Création de la première VM : TrueNAS

Pour le stockage centralisé, j'ai déployé une machine virtuelle TrueNAS Core. Cette distribution FreeBSD spécialisée dans le stockage offre des fonctionnalités avancées : snapshots, réplication, chiffrement, et interface web intuitive.

La configuration de TrueNAS nécessite de passer les disques de stockage en mode "passthrough" pour que le système puisse gérer directement le RAID matériel. Cette étape est critique pour les performances et la fiabilité.

## Sécurisation et maintenance

La sécurité d'un serveur domestique ne doit pas être négligée. J'ai mis en place plusieurs mesures :

- Changement des mots de passe par défaut
- Configuration d'un firewall avec règles restrictives
- Mise en place de sauvegardes automatisées
- Monitoring des ressources et alertes par email

Les mises à jour régulières de Proxmox et des machines virtuelles sont essentielles pour maintenir la sécurité du système.

## Résultats et perspectives

Après six mois d'utilisation, le serveur Proxmox fonctionne de manière stable et fiable. Il héberge actuellement :

- Une VM TrueNAS pour le stockage familial (4 TB utilisables)
- Une VM Ubuntu Server pour les services web
- Un conteneur LXC pour Home Assistant

Cette infrastructure m'a permis d'acquérir une expérience pratique précieuse en administration système et virtualisation, compétences directement transférables dans un contexte professionnel.`,
      date: '5 Janvier 2025',
      readTime: '15 min',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200',
      imageCaption: 'Serveur rack dans un centre de données moderne',
      author: 'Samuel Lecomte',
      category: 'Infrastructure',
      keywords: ['proxmox', 'virtualisation', 'serveur domestique', 'truenas'],
      likes: 35
    }
  }
};

// Categories data
export const categoriesData: Record<string, CategoryData> = {
  adventures: {
    id: 'adventures',
    title: 'Aventures & Défis',
    description: 'Récits de courses en montagne et événements sportifs',
    color: 'from-emerald-500 to-teal-500',
    icon: 'Mountain',
    hoverColor: 'hover:border-emerald-400/50',
    bgGradient: 'from-emerald-900/20 to-teal-900/20'
  },
  science: {
    id: 'science',
    title: 'Science & Découvertes',
    description: 'Discussions sur les avancées scientifiques et perspectives en physique',
    color: 'from-violet-500 to-purple-500',
    icon: 'Microscope',
    hoverColor: 'hover:border-violet-400/50',
    bgGradient: 'from-violet-900/20 to-purple-900/20'
  },
  tech: {
    id: 'tech',
    title: 'Tech & Implémentations',
    description: 'Tutoriels techniques et documentation de projets',
    color: 'from-cyan-500 to-blue-500',
    icon: 'Code2',
    hoverColor: 'hover:border-cyan-400/50',
    bgGradient: 'from-cyan-900/20 to-blue-900/20'
  }
};

// Helper functions
export const getArticleById = (categoryId: string, articleId: string): ArticleData | null => {
  return articlesData[categoryId]?.[articleId] || null;
};

export const getArticlesByCategory = (categoryId: string): ArticleData[] => {
  const categoryArticles = articlesData[categoryId];
  return categoryArticles ? Object.values(categoryArticles) : [];
};

export const getCategoryById = (categoryId: string): CategoryData | null => {
  return categoriesData[categoryId] || null;
};

export const getAllCategories = (): CategoryData[] => {
  return Object.values(categoriesData);
};

// Get related articles based on category and keywords
export const getRelatedArticles = (currentArticleId: string, categoryId: string, maxResults: number = 3): ArticleData[] => {
  const allArticles: ArticleData[] = [];
  
  // Collect all articles from all categories
  Object.keys(articlesData).forEach(catId => {
    Object.values(articlesData[catId]).forEach(article => {
      allArticles.push(article);
    });
  });
  
  // Filter out current article
  const otherArticles = allArticles.filter(article => article.id !== currentArticleId);
  
  // Get current article for comparison
  const currentArticle = getArticleById(categoryId, currentArticleId);
  if (!currentArticle) return [];
  
  // Score articles based on relevance
  const scoredArticles = otherArticles.map(article => {
    let score = 0;
    
    // Same category gets highest priority
    if (article.category === currentArticle.category) {
      score += 10;
    }
    
    // Check for common keywords
    const currentKeywords = currentArticle.keywords.map(k => k.toLowerCase());
    const articleKeywords = article.keywords.map(k => k.toLowerCase());
    
    articleKeywords.forEach(keyword => {
      if (currentKeywords.includes(keyword)) {
        score += 5;
      }
    });
    
    // Check for similar words in titles (simple matching)
    const currentTitleWords = currentArticle.title.toLowerCase().split(' ');
    const articleTitleWords = article.title.toLowerCase().split(' ');
    
    articleTitleWords.forEach(word => {
      if (word.length > 3 && currentTitleWords.includes(word)) {
        score += 2;
      }
    });
    
    return { article, score };
  });
  
  // Sort by score (highest first) and return top results
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => item.article);
};