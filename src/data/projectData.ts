import quantumCPU from '../assets/quantum_cpu.webp';
import arduinoM1 from '../assets/arduino_M1.jpg';
import arduinoM2 from '../assets/arduino_M2.jpg';
import data_analysis_L3 from '../assets/data_analysis.jpg';
import saturn_chaos_L3 from '../assets/saturn.jpg';
import LabVIEW_muon_M1 from '../assets/LabVIEW.png';
import Ising_M1 from '../assets/ising.png';
import muon_lifetime from '../assets/muon_lifetime.png';
import proxmox from '../assets/proxmox.png';

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  subtitle?: string;
  detailedDescription: string;
  technologies: string[];
  category: 'personal' | 'academic' | 'internship';
  status: 'completed' | 'in-progress' | 'planned';
  period: string;
  location: string;
  image: string;
  imageCredit?: string;
  imageCreditUrl?: string;
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
    title: 'Personal projects',
    description: 'Self-developed projects to try new technologies',
    color: 'from-blue-500 to-cyan-500',
    icon: 'User',
    hoverColor: 'hover:border-blue-400/50',
    bgGradient: 'from-blue-900/20 to-cyan-900/20'
  },
  {
    id: 'academic',
    title: 'Academic projects',
    description: 'Projects from my university coursework',
    color: 'from-purple-500 to-violet-500',
    icon: 'GraduationCap',
    hoverColor: 'hover:border-purple-400/50',
    bgGradient: 'from-purple-900/20 to-violet-900/20'
  },
  {
    id: 'internship',
    title: 'Laboratory internship',
    description: 'Professional experience and lab research projects',
    color: 'from-green-500 to-emerald-500',
    icon: 'Briefcase',
    hoverColor: 'hover:border-green-400/50',
    bgGradient: 'from-green-900/20 to-emerald-900/20'
  }
];

// ----------------------------------------------------------------------------------------------------
// Centralized projects data
// ----------------------------------------------------------------------------------------------------
export const projectsData: Record<string, Record<string, ProjectData>> = {
  personal: {
    'home-server': {
      id: 'home-server',
      title: 'Proxmox Home Server',
      description: 'Configuration of a Proxmox server with a TrueNAS VM to create a secure family cloud. Storage management and remote access.',
      subtitle: 'Building a Private and Scalable Family Cloud',
      detailedDescription: `
## Building a Private and Scalable Family Cloud

#### Technologies Used : **Bash**, **Proxmox VE**, **TrueNAS Core**, **Nginx Proxy Manager**

### Project Overview

This project aims to build a self-hosted cloud infrastructure for my family, accessible from anywhere. The goal is to combine security, flexibility, and full control over data, while learning new things in networking, virtualization, and server administration.

Rather than relying on public cloud services or buying a prebuilt NAS, I chose to repurpose an old computer and design the system from scratch. The current setup uses an AMD A8-7650K, 32 GB of DDR3 RAM, a 500 GB SSD for system files, and a 500 GB HDD for data. In the long term, I plan to expand to an array of six 4 TB drives configured in RAID-Z1 under ZFS, providing high redundancy and throughput, and add a dedicated GPU for real-time transcoding in Jellyfin.

On the software side, I chose Proxmox VE as the hypervisor to manage virtual machines and containers. This choice allows me to experiment directly with virtualization, creating isolated environments for each service. Inside Proxmox, I deployed TrueNAS Community, which acts as the storage backbone of the system. TrueNAS’s native ZFS support makes it easy to manage backup, data optimization, and security tasks. Compared with off-the-shelf NAS systems, TrueNAS gives me complete transparency, open-source flexibility, and full integration with Linux-based tools.

For secure remote access, the entire infrastructure sits behind an Nginx Proxy Manager reverse proxy. I purchased a custom domain and configured subdomains that route HTTPS traffic directly to local services. I deliberately avoided using a VPN: while functional, it would have required extra configuration on each client device, reducing usability. 

The system currently supports three main objectives:
- A virtual machine platform where users can deploy and experiment with different operating systems.  
- A personal cloud powered by TrueNAS and Nextcloud for file management.
- A multimedia hub using Jellyfin, where shared libraries of movies, photos, and music are available to all users.

### Future Objectives

- Expanding the storage array. 
- Integrating monitoring tools (Grafana and Prometheus).   
- Refining user permissions and automated backup policies.`,
      technologies: ['Proxmox', 'TrueNAS', 'Virtualization', 'Networking', 'NAS', 'server'],
      category: 'personal',
      status: 'in-progress',
      period: '2025 - Present',
      location: 'Personal project',
      image: proxmox,
      imageCredit : 'Lawrence Systems',
      imageCreditUrl: 'https://commons.wikimedia.org/wiki/File:Client_Project_Hashcat_Testing_With_an_AMD_Epyc_Supermicro_Nvidia_GPU_Server_Using_Proxmox_%28Lawrence_Systems%29_02.png',
      gitlabUrl: 'https://gitlab.com/samuel.lecomte37/proxmox-homeserver',
      difficulty: 'advanced',
      dateCreated: '2025-07-15',
      keywords: ['virtualization', 'storage', 'cloud', 'server', 'NAS']
    },
    'portfolio-website': {
      id: 'portfolio-website',
      title: 'Creating a Portfolio Website',
      description:
        'Development of a personal portfolio website to showcase my academic and technical projects.',
      subtitle: 'Showcasing My Journey in Tech and Physics',
      detailedDescription: 'Content coming soon...',
      technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
      category: 'personal',
      status: 'in-progress',
      period: '2025',
      location: 'Personal project',
      image:
        'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200',
      difficulty: 'intermediate',
      dateCreated: '2025-02-15',
      keywords: ['portfolio', 'frontend', 'typescript', 'react']
    }
  },
  academic: {
    'data-analysis': {
      id: 'data-analysis',
      title: 'Introduction to Data Analysis in Physics',
      description:
        "Presentation of raw data filtering process applied to HL-LHC simulated data to estimate the presence of an 'X boson'.",
      subtitle: 'Searching for New Particles in Simulated LHC Data',
      detailedDescription: 'Content coming soon...',
      technologies: ['Python', 'Statistical analysis', 'Simulation'],
      category: 'academic',
      status: 'completed',
      period: 'L3 - 2022',
      location: 'Université Clermont Auvergne',
      image: data_analysis_L3,
      gitlabUrl: 'https://github.com/Samuellct/ATLAS-basic-particle-search-workflow',
      difficulty: 'intermediate',
      dateCreated: '2022-03-01',
      keywords: ['physics', 'statistics', 'python', 'simulation']
    },
    'ising-model': {
      id: 'ising-model',
      title: 'Ising Model',
      description:
        'Study of the Ising model with a Python simulation of the two-dimensional case.',
      subtitle: 'Simulating Phase Transitions in Magnetic Systems',
      detailedDescription: 'Content coming soon...',
      technologies: ['Python', 'Statistical physics', 'Monte Carlo simulation'],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: Ising_M1,
      imageCredit: 'Damian Owls',
      imageCreditUrl: 'https://commons.wikimedia.org/wiki/File:Ising_Criticality2.gif',
      gitlabUrl: 'https://gitlab.com/samuel.lecomte37/ising-model',
      difficulty: 'intermediate',
      dateCreated: '2024-03-01',
      keywords: ['ising', 'monte carlo', 'phase transition']
    },
    'quantum-algorithms': {
      id: 'quantum-algorithms',
      title: 'Quantum Algorithm Demos using Cirq',
      description: 'Introduction to quantum computing and its application to cryptography. Python simulation of Shor\'s algorithm using the Cirq library.',
      subtitle: 'Principles of Quantum Computing and Application to Cryptographic Algorithms',
      detailedDescription: `
This project introduces the fundamentals of quantum computing and explores its implications for cryptography, particularly through the simulation of Shor’s algorithm using Cirq, Google’s quantum framework.

The work begins with a study of the main quantum concepts such as superposition, entanglement, and measurement, illustrating how qubits can encode and process information in parallel. These principles are then applied to the context of RSA encryption, highlighting how quantum algorithms could threaten current cryptographic systems.

The core of the project consists of a simulation of Shor’s algorithm, a quantum method for integer factorization that could potentially break RSA encryption by efficiently decomposing large numbers into their prime factors. The algorithm was implemented in Python using Cirq, with several tests comparing classical and quantum-inspired factorization methods. While current hardware limitations prevent real-world execution on large inputs, the simulation demonstrates the mathematical and conceptual power of quantum computing.

**Main objectives:**
- Understand the mathematical basis of quantum gates and circuits.
- Implement and test Shor’s algorithm using Cirq.
- Evaluate its impact on RSA cryptography.`,
      technologies: ['Python', 'Cirq', 'Quantum Fourier Transform', 'RSA Cryptography'],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: quantumCPU,
      imageCredit: 'Google',
      gitlabUrl: 'https://github.com/Samuellct/Cirq-Quantum-Cryptography-Demo',
      difficulty: 'advanced',
      dateCreated: '2023-11-29',
      keywords: ['quantum computing', 'Shor’s algorithm', 'RSA', 'Cirq', 'cryptography']
    },
    'arduino-weather': {
      id: 'arduino-weather',
      title: 'Arduino Weather Station',
      description:
        'Creation of a weather station composed of multiple sensors and a display to visualize data.',
      subtitle: 'Building a DIY Environmental Monitoring System',
      detailedDescription: 'Content coming soon...',
      technologies: ['Arduino', 'C++', 'IoT sensors'],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: arduinoM1,
      gitlabUrl: 'https://gitlab.com/samuel.lecomte37/arduino-weather-station',
      difficulty: 'beginner',
      dateCreated: '2025-01-22',
      keywords: ['arduino', 'iot', 'sensors', 'weather']
    },
    'labview': {
      id: 'labview',
      title: 'Measurement of the Muon Landé *g*-Factor',
      description:
        'Development of a LabVIEW interface to control a muon detector with real-time graphical data analysis.',
      subtitle: 'Real-Time Particle Detection and Analysis',
      detailedDescription: 'Content coming soon...',
      technologies: ['LabVIEW', 'Data acquisition', 'GUI'],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: LabVIEW_muon_M1,
      imageCredit: 'Aldhair.gsnt',
      imageCreditUrl: 'https://commons.wikimedia.org/wiki/File:Labview_code_example.png',
      gitlabUrl: 'https://gitlab.com/samuel.lecomte37/labview-muon-detector',
      difficulty: 'intermediate',
      dateCreated: '2024-01-15',
      keywords: ['labview', 'muons', 'data acquisition']
    },
    'muon-lifetime': {
      id: 'muon-lifetime',
      title: 'Muon Lifetime Measurement',
      description:
        'Data acquisition with a muon detector and analysis using ROOT to determine muon lifetime.',
      subtitle: 'Measuring Fundamental Particle Properties',
      detailedDescription: 'Content coming soon...',
      technologies: ['ROOT', 'C++', 'Statistical analysis'],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: muon_lifetime,
      imageCredit: 'Mrmw',
      imageCreditUrl: 'https://commons.wikimedia.org/wiki/File:Muon_Decay.svg',
      gitlabUrl: 'https://gitlab.com/samuel.lecomte37/muon-lifetime-analysis',
      difficulty: 'advanced',
      dateCreated: '2024-02-15',
      keywords: ['muons', 'root', 'particle physics']
    },
    'saturn-rings': {
      id: 'saturn-rings',
      title: 'Stability of Saturn\'s Rings',
      description: 'Study of the dynamic stability and chaotic regime of Saturn\'s rings.',
      subtitle: 'Exploring Orbital Dynamics and Chaos Theory',
      detailedDescription: 'Content coming soon...',
      technologies: ['Python', 'Astrophysics', 'Modeling'],
      category: 'academic',
      status: 'completed',
      period: 'L3 - 2023',
      location: 'Université Clermont Auvergne',
      image: saturn_chaos_L3,
      imageCredit: 'NASA, ESA, A. Simon, and M.H. Wong',
      imageCreditUrl: 'https://esahubble.org/images/heic1917a/',
      difficulty: 'intermediate',
      dateCreated: '2023-04-15',
      keywords: ['astrophysics', 'planetary science', 'simulation']
    },
    'arduino-anemometer': {
      id: 'arduino-anemometer',
      title: 'Arduino-Controlled Anemometer',
      description: 'Design and calibration of a wind-speed measurement system using Arduino.',
      subtitle: 'Designing Precision Wind Measurement Tools',
      detailedDescription: 'Content coming soon...',
      technologies: ['Arduino', 'C++', 'Sensors', 'Electronics'],
      category: 'academic',
      status: 'completed',
      period: 'M1 - 2024',
      location: 'Université Clermont Auvergne',
      image: arduinoM2,
      difficulty: 'beginner',
      dateCreated: '2024-03-10',
      keywords: ['arduino', 'anemometer', 'sensors', 'wind measurement']
    }
  },
  internship: {
    'internship-m1': {
      id: 'internship-m1',
      title: 'Master 1 Internship - LPCA (LHCb Team)',
      description: 'Study of a rare B meson decay mode. Development of data analysis scripts with ROOT for LHCb Run I.',
      subtitle: 'Investigating Rare Decay Channels in B Mesons',
      detailedDescription: `Content coming soon...`,
      technologies: ['ROOT', 'C++', 'Data analysis', 'Particle physics'],
      category: 'internship',
      status: 'completed',
      period: 'April - June 2024',
      location: 'Aubière, France',
      featured: true,
      difficulty: 'advanced',
      dateCreated: '2024-04-01',
      keywords: ['lhcb', 'physique des particules', 'root', 'analyse de données']
    },
    'internship-m2': {
      id: 'internship-m2',
      title: 'Master 2 Internship - LPCA (ATLAS Team)',
      description: 'Generation and analysis of simulated events to evaluate the feasibility of searches for long-lived particles (LLPs) at the HL-LHC.',
      subtitle: 'Pioneering Searches for Long-Lived Particles',
      detailedDescription: `Content coming soon...`,
      technologies: ['MadGraph', 'Pythia', 'Docker', 'C++', 'git'],
      category: 'internship',
      status: 'completed',
      period: 'February - July 2025',
      location: 'Aubière, France',
      featured: true,
      difficulty: 'advanced',
      dateCreated: '2025-02-01',
      keywords: ['atlas', 'particules longue durée de vie', 'hl-lhc', 'simulation']
    }
  }
};

// ----------------------------------------------------------------------------------------------------
// Categories data
// ----------------------------------------------------------------------------------------------------
export const categoriesData: Record<string, CategoryData> = {
  personal: projectCategories[0],
  academic: projectCategories[1],
  internship: projectCategories[2]
};

// ----------------------------------------------------------------------------------------------------
// Helper functions
// ----------------------------------------------------------------------------------------------------
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