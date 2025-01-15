import { GITHUB_API_BASE, GITHUB_TOKEN } from '../config/config';

export const useGithubApi = () => {
  const headers = GITHUB_TOKEN ? {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
  } : {};

  const fetchRepoData = async (owner, repo) => {
    try {
      const [repoResponse, contentsResponse, deploymentsResponse] = await Promise.all([
        fetch(`https://api.github.com/repos/${owner}/${repo}`),
        fetch(`https://api.github.com/repos/${owner}/${repo}/contents`),
        fetch(`https://api.github.com/repos/${owner}/${repo}/deployments`, { headers })
      ]);

      if (!repoResponse.ok || !contentsResponse.ok) {
        throw new Error('Repository not found');
      }

      const repoData = await repoResponse.json();
      const contents = await contentsResponse.json();
      const deployments = deploymentsResponse.ok ? await deploymentsResponse.json() : [];

      // Initialize deployment config
      const deploymentConfig = {
        githubPages: {
          enabled: false,
          url: `https://${owner}.github.io/${repo}`
        },
        vercel: null,
        netlify: null,
        deploymentUrls: []
      };

      // Check repository description and about section for deployment URLs
      const description = repoData.description || '';
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urlsInDescription = description.match(urlRegex) || [];
      deploymentConfig.deploymentUrls.push(...urlsInDescription);

      // Check for deployment URLs in deployments
      if (deployments.length > 0) {
        deployments.forEach(deployment => {
          if (deployment.environment && deployment.environment_url) {
            deploymentConfig.deploymentUrls.push(deployment.environment_url);
            
            // Identify deployment platform
            if (deployment.environment_url.includes('vercel.app')) {
              deploymentConfig.vercel = deployment.environment_url;
            } else if (deployment.environment_url.includes('netlify.app')) {
              deploymentConfig.netlify = deployment.environment_url;
            }
          }
        });
      }

      // Check repository homepage
      if (repoData.homepage) {
        deploymentConfig.deploymentUrls.push(repoData.homepage);
      }

      // Check for deployment configuration files and their contents
      try {
        // Check for Vercel config
        const vercelConfig = contents.find(file => 
          file.name === 'vercel.json' || 
          file.name === '.vercel'
        );
        if (vercelConfig && !deploymentConfig.vercel) {
          const vercelUrl = `https://${repo}-${owner}.vercel.app`;
          deploymentConfig.vercel = vercelUrl;
          deploymentConfig.deploymentUrls.push(vercelUrl);
        }

        // Check for Netlify config
        const netlifyConfig = contents.find(file => 
          file.name === 'netlify.toml' || 
          file.name === '_redirects' ||
          file.name === '_headers'
        );
        if (netlifyConfig && !deploymentConfig.netlify) {
          const netlifyUrl = `https://${repo}.netlify.app`;
          deploymentConfig.netlify = netlifyUrl;
          deploymentConfig.deploymentUrls.push(netlifyUrl);
        }

        // Check package.json for additional URLs
        const packageJson = contents.find(file => file.name === 'package.json');
        if (packageJson) {
          const packageResponse = await fetch(packageJson.download_url);
          const packageData = await packageResponse.json();
          if (packageData.homepage) {
            deploymentConfig.deploymentUrls.push(packageData.homepage);
          }
        }
      } catch (error) {
        console.error('Error checking deployment configurations:', error);
      }

      // Remove duplicates and filter valid URLs
      deploymentConfig.deploymentUrls = [...new Set(deploymentConfig.deploymentUrls)]
        .filter(url => url && url.startsWith('http'));

      return { 
        ...repoData, 
        deploymentConfig,
        homepage: repoData.homepage || deploymentConfig.deploymentUrls[0] || null
      };
    } catch (error) {
      throw new Error('Failed to fetch repository data');
    }
  };

  const fetchFileStructure = async (owner, repo) => {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents`, { headers });
      
      if (!response.ok) {
        throw new Error('Failed to fetch file structure');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch file structure');
    }
  };
  const fetchReadme = async (owner, repo) => {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`,
        { 
          headers: {
            ...headers,
            Accept: 'application/vnd.github.raw'
          }
        }
      );
      
      if (!response.ok) {
        return ''; // Return empty string if README not found
      }
      
      return await response.text();
    } catch (error) {
      return ''; // Return empty string on error
    }
  };

  return { fetchRepoData, fetchFileStructure, fetchReadme };
};

