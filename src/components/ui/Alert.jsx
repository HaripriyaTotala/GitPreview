import React from "react";
const Alert = ({ children, variant = 'default' }) => {
    const variants = {
      default: 'bg-gray-50 text-gray-900 dark:bg-blue-50 dark:text-blue-900',
      destructive: 'bg-red-50 text-red-900',
    };
  
    return (
      <div className={`p-4 rounded-lg ${variants[variant]}`}>
        {children}
      </div>
    );
  };
  
  export const AlertTitle = ({ children }) => (
    <h5 className="font-medium mb-1 text-gray-900 dark:text-current">{children}</h5>
  );
  
  export default Alert;
  