import React from 'react';
import { Star, GitFork, Eye, Calendar } from 'lucide-react';

const RepoInfo = ({ repoData }) => {
  return (
    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{repoData.name}</h2>
          <a
            href={repoData.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            View on GitHub
          </a>
        </div>

        <p className="text-gray-300">{repoData.description}</p>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center text-gray-300">
            <Star className="h-4 w-4 mr-1" />
            {repoData.stargazers_count.toLocaleString()} stars
          </div>
          <div className="flex items-center text-gray-300">
            <GitFork className="h-4 w-4 mr-1" />
            {repoData.forks_count.toLocaleString()} forks
          </div>
          <div className="flex items-center text-gray-300">
            <Eye className="h-4 w-4 mr-1" />
            {repoData.watchers_count.toLocaleString()} watchers
          </div>
          <div className="flex items-center text-gray-300">
            <Calendar className="h-4 w-4 mr-1" />
            Created: {new Date(repoData.created_at).toLocaleDateString()}
          </div>
        </div>

        {repoData.topics && repoData.topics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {repoData.topics.map(topic => (
              <span
                key={topic}
                className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RepoInfo;
