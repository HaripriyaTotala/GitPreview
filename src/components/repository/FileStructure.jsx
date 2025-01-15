import React from 'react';
import { Folder, File, ChevronRight, ChevronDown } from 'lucide-react';

const FileStructure = ({ fileStructure }) => {
  return (
    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Repository Structure</h3>
      <div className="bg-gray-800 rounded-lg p-4 overflow-auto max-h-96">
        <div className="font-mono text-sm text-gray-300">
          {fileStructure.map((file, index) => (
            <div
              key={index}
              className="flex items-center py-1 hover:text-white transition-colors"
              style={{ paddingLeft: `${file.depth * 1.5}rem` }}
            >
              {file.type === 'directory' ? (
                <Folder className="h-4 w-4 mr-2 text-gray-400" />
              ) : (
                <File className="h-4 w-4 mr-2 text-gray-400" />
              )}
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileStructure;
