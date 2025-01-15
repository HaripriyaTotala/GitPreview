import React from 'react';
import { Search } from 'lucide-react';

const UrlForm = ({ url, setUrl, loading, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-indigo-600 dark:to-blue-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative flex items-center">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter GitHub repository URL"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg 
                     shadow-sm focus:ring-2 focus:ring-gray-900 dark:focus:ring-indigo-500 focus:border-transparent outline-none
                     text-gray-900 dark:text-gray-200 placeholder-gray-600 dark:placeholder-gray-400 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 p-2 bg-gray-900 dark:bg-indigo-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-indigo-700 
                     transition-all duration-300 transform hover:scale-105 disabled:opacity-50 
                     disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      <p className="mt-2 text-sm text-center text-gray-900 dark:text-gray-400 animate-fadeIn delay-300">
        Example: https://github.com/facebook/react
      </p>
    </form>
  );
};

export default UrlForm;