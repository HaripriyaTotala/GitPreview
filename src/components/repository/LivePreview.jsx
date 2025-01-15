import React, { useState, useEffect } from 'react';
import { ExternalLink, Code, Globe, Terminal, Github } from 'lucide-react';

const LivePreview = ({ owner, repo, repoData }) => {
  const [activePreview, setActivePreview] = useState('githubPages');
  const [deploymentUrls, setDeploymentUrls] = useState([]);

  useEffect(() => {
    if (repoData) {
      const urls = [];
      
      // Always add GitHub Pages
      urls.push({
        id: 'githubPages',
        label: 'GitHub Pages',
        icon: Globe,
        url: `https://${owner}.github.io/${repo}`,
        enabled: true
      });

      // Add homepage if it exists and is different from GitHub Pages
      if (repoData.homepage && repoData.homepage !== `https://${owner}.github.io/${repo}`) {
        urls.push({
          id: 'main',
          label: 'Live Site',
          icon: Globe,
          url: repoData.homepage
        });
      }

      // Add Vercel deployment if it exists
      if (repoData.deploymentConfig?.vercel) {
        urls.push({
          id: 'vercel',
          label: 'Vercel',
          icon: ExternalLink,
          url: repoData.deploymentConfig.vercel
        });
      }

      // Add Netlify deployment if it exists
      if (repoData.deploymentConfig?.netlify) {
        urls.push({
          id: 'netlify',
          label: 'Netlify',
          icon: ExternalLink,
          url: repoData.deploymentConfig.netlify
        });
      }

      // Add any additional URLs
      if (repoData.deploymentConfig?.deploymentUrls) {
        repoData.deploymentConfig.deploymentUrls
          .filter(url => 
            url !== repoData.homepage && 
            url !== `https://${owner}.github.io/${repo}` &&
            url !== repoData.deploymentConfig?.vercel &&
            url !== repoData.deploymentConfig?.netlify
          )
          .forEach((url, index) => {
            urls.push({
              id: `additional-${index}`,
              label: 'Deployment',
              icon: ExternalLink,
              url: url
            });
          });
      }

      setDeploymentUrls(urls);
    }
  }, [repoData, owner, repo]);

  const activeUrl = deploymentUrls.find(u => u.id === activePreview)?.url;

  return (
    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Live Preview</h3>
          <span className="text-green-400 text-sm">
            {deploymentUrls.length} deployment(s) available
          </span>
        </div>

        {/* Preview buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {deploymentUrls.map(({ id, label, icon: Icon, url }) => (
            <button
              key={id}
              onClick={() => setActivePreview(id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                activePreview === id
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {label}
            </button>
          ))}
        </div>

        {/* Preview frame */}
        {activeUrl && (
          <div className="aspect-video relative bg-gray-800 rounded-lg">
            <iframe
              src={activeUrl}
              className="w-full h-full rounded-lg border border-gray-700"
              title="Repository Preview"
              allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />
          </div>
        )}

        {/* Deployment links */}
        <div className="mt-4 flex flex-wrap gap-2">
          {deploymentUrls.map(({ id, label, url }) => (
            <a
              key={id}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Open in {label}
            </a>
          ))}
          <a
            href={`https://github.com/${owner}/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
          >
            <Github className="h-4 w-4 mr-1" />
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
