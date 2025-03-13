import React from 'react';
import { Button } from '../ui/button.tsx';

const Header: React.FC = () => {
  return (
    <header className="col-span-2 row-start-1 flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-primary">A/B Test Visualization</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          Export
        </Button>
      </div>
    </header>
  );
};

export default Header;
