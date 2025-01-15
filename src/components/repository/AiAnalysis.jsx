import React from 'react';
import { Bot } from 'lucide-react';

const AiAnalysis = ({ analysis, loading, onAnalyze }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          <Bot className="h-5 w-5 mr-2 text-gray-900 dark:text-blue-600" />
          AI Repository Analysis
        </h3>
        <button
          onClick={onAnalyze}
          disabled={loading}
          className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
            loading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gray-900 dark:bg-blue-600 text-white hover:bg-gray-800 dark:hover:bg-blue-700 hover:shadow-md'
          }`}
        >
          <Bot className="h-4 w-4 mr-2" />
          {loading ? 'Analyzing...' : 'Analyze Repository'}
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {analysis && (
        <div className="prose dark:prose-invert max-w-none animate-fadeIn">
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 transform transition-all duration-300 hover:scale-[1.01]">
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Repository Overview</h4>
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed">{analysis.overview}</p>
            </div>

            {analysis.features && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 transform transition-all duration-300 hover:scale-[1.01]">
                <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Key Features</h4>
                <ul className="list-disc list-inside space-y-2">
                  {analysis.features.map((feature, index) => (
                    <li 
                      key={index} 
                      className="text-gray-800 dark:text-gray-300"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysis.technologies && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 transform transition-all duration-300 hover:scale-[1.01]">
                <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 
                               rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 
                               cursor-default shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {!loading && !analysis && (
        <div className="text-center p-8 text-gray-900 dark:text-gray-400 animate-pulse">
          <Bot className="h-12 w-12 mx-auto mb-4 text-gray-900 dark:text-blue-600 opacity-50" />
          Click "Analyze Repository" to get AI-powered insights about this repository.
        </div>
      )}
    </div>
  );
};

export default AiAnalysis;
