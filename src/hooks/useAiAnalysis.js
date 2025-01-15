import { useCallback } from 'react';

export const useAiAnalysis = () => {
  const analyzeRepository = useCallback(async (repoData, fileStructure, readme) => {
    try {
      // Here you would typically make an API call to your AI service
      // For now, we'll create a simple analysis based on available data
      const analysis = {
        overview: `${repoData.name} is a ${repoData.description || 'software'} project with ${
          fileStructure.length
        } files. ${repoData.stargazers_count} users have starred this repository.`,
        
        features: [
          `${repoData.language || 'Multiple'} programming language`,
          repoData.has_issues && 'Issue tracking enabled',
          repoData.has_wiki && 'Wiki documentation',
          repoData.has_pages && 'GitHub Pages enabled',
          'Open source project'
        ].filter(Boolean),
        
        technologies: [
          repoData.language,
          ...detectTechnologies(fileStructure)
        ].filter(Boolean)
      };

      return analysis;
    } catch (error) {
      throw new Error('Failed to analyze repository');
    }
  }, []);

  return { analyzeRepository };
};

// Helper function to detect technologies based on file extensions
function detectTechnologies(fileStructure) {
  const technologies = new Set();
  
  const techMap = {
    '.js': 'JavaScript',
    '.jsx': 'React',
    '.ts': 'TypeScript',
    '.tsx': 'React + TypeScript',
    '.css': 'CSS',
    '.scss': 'SASS',
    '.html': 'HTML',
    '.py': 'Python',
    '.java': 'Java',
    '.php': 'PHP',
    '.go': 'Go',
    '.rb': 'Ruby',
    'package.json': 'Node.js',
    'docker': 'Docker',
    '.yml': 'YAML',
    'webpack': 'Webpack',
    'vite': 'Vite'
  };

  fileStructure.forEach(file => {
    Object.entries(techMap).forEach(([key, tech]) => {
      if (file.path.toLowerCase().includes(key.toLowerCase())) {
        technologies.add(tech);
      }
    });
  });

  return Array.from(technologies);
}
