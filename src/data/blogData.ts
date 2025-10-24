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
  visible?: boolean;
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

// ==============================================================================
// Categories Configuration
// ==============================================================================

export const blogCategories: CategoryData[] = [
  {
    id: 'adventures',
    title: 'Adventures',
    description: 'Mountain Race Reports and Other Sporting Highlights',
    color: 'from-emerald-500 to-teal-500',
    icon: 'Mountain',
    hoverColor: 'hover:border-emerald-400/50',
    bgGradient: 'from-emerald-900/20 to-teal-900/20'
  },
  {
    id: 'science',
    title: 'Science',
    description: 'Discussions on some recent scientific results',
    color: 'from-violet-500 to-purple-500',
    icon: 'Microscope',
    hoverColor: 'hover:border-violet-400/50',
    bgGradient: 'from-violet-900/20 to-purple-900/20'
  },
  {
    id: 'tech',
    title: 'Tech',
    description: 'Tutorials and documentation of my projects',
    color: 'from-cyan-500 to-blue-500',
    icon: 'Code2',
    hoverColor: 'hover:border-cyan-400/50',
    bgGradient: 'from-cyan-900/20 to-blue-900/20'
  }
];

// ==============================================================================
// Centralized articles data
// ==============================================================================
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
      imageCaption: 'High-performance computing center',
      author: 'Samuel Lecomte',
      category: 'Science',
      keywords: ['particle physics', 'computing centers', 'big data', 'distributed computing'],
      likes: 42,
      visible: true
    }
  },
  
  adventures: {
    'saintexpress': {
      id: 'saintexpress',
      title: "SaintExpress",
      content: ``,
      date: 'TBD',
      readTime: '999 min',
      image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=1200',
      imageCaption: 'TBD',
      author: 'Samuel Lecomte',
      category: 'Adventures',
      keywords: ['trail running'],
      likes: 0,
      visible: false
    },
    "olympics-10k": {
      id: "olympics-10k",
      title: "My 10k Run at the Olympics",
      content: "",
      date: "TBD",
      readTime: "-",
      image:
        "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageCaption: "",
      author: "Samuel Lecomte",
      category: "Adventures",
      keywords: [],
      likes: 0,
      visible: false      
    },
    "maxi-race-annecy": {
      id: "maxi-race-annecy",
      title: "MaXi-Race : 100km around Lake Annecy",
      content: "",
      date: "TBD",
      readTime: "-",
      image:
        "https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageCaption: "",
      author: "Samuel Lecomte",
      category: "Adventures",
      keywords: [],
      likes: 0,
      visible: true
    }
  },
  tech: {
    "diy-server-proxmox": {
      id: "diy-server-proxmox",
      title: "Building a DIY Server: Proxmox Installation",
      content: "",
      date: "TBD",
      readTime: "—",
      image:
        "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageCaption: "",
      author: "Samuel Lecomte",
      category: "Tech",
      keywords: [],
      likes: 0,
      visible: false
    },
    "truenas-on-proxmox": {
      id: "truenas-on-proxmox",
      title: "Building a Private NAS: Installing TrueNAS on Proxmox",
      content: "",
      date: "TBD",
      readTime: "—",
      image:
        "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageCaption: "",
      author: "Samuel Lecomte",
      category: "Tech",
      keywords: [],
      likes: 0,
      visible: true
    },
    "jellyfin-media-server": {
      id: "jellyfin-media-server",
      title: "Jellyfin: An Open-Source Media Server",
      content: "",
      date: "TBD",
      readTime: "—",
      image:
        "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageCaption: "",
      author: "Samuel Lecomte",
      category: "Tech",
      keywords: [],
      likes: 0,
      visible: false
    },
    "nas-remote-access": {
      id: "nas-remote-access",
      title: "Accessing Your NAS / Media Server From Anywhere",
      content: "",
      date: "TBD",
      readTime: "—",
      image:
        "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1200",
      imageCaption: "",
      author: "Samuel Lecomte",
      category: "Tech",
      keywords: [],
      likes: 0,
      visible: false
    },
  },
};

// ==============================================================================
// Categories data
// ==============================================================================
export const categoriesData: Record<string, CategoryData> = {
  adventures: {
    id: 'adventures',
    title: 'Adventures',
    description: 'Mountain Race Reports and Other Sporting Highlights',
    color: 'from-emerald-500 to-teal-500',
    icon: 'Mountain',
    hoverColor: 'hover:border-emerald-400/50',
    bgGradient: 'from-emerald-900/20 to-teal-900/20'
  },
  science: {
    id: 'science',
    title: 'Science',
    description: 'Discussions on some recent scientific results',
    color: 'from-violet-500 to-purple-500',
    icon: 'Microscope',
    hoverColor: 'hover:border-violet-400/50',
    bgGradient: 'from-violet-900/20 to-purple-900/20'
  },
  tech: {
    id: 'tech',
    title: 'Tech',
    description: 'Tutorials and documentation of my projects',
    color: 'from-cyan-500 to-blue-500',
    icon: 'Code2',
    hoverColor: 'hover:border-cyan-400/50',
    bgGradient: 'from-cyan-900/20 to-blue-900/20'
  }
};

// ==============================================================================
// Helper functions
// ==============================================================================
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
      if (article.visible === false) return; // Skip invisible articles
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