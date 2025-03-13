import React, { useState, useCallback } from 'react';
import { Button } from '../ui/button.tsx';
import { Card, CardContent } from '../ui/card.tsx';

const UploadView: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  }, []);
  
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  }, []);
  
  const removeFile = useCallback((index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  }, []);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Upload Design Mockups</h1>
        <p className="text-gray-600 max-w-3xl">
          Upload your UI/UX design mockups to generate predictive heatmaps and metrics. 
          You can upload multiple designs to compare different variations.
        </p>
      </div>
      
      <div 
        className={`mt-8 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-gray-300 hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-16 w-16 ${isDragging ? 'text-primary' : 'text-gray-400'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-900">Drag and drop your files here</h3>
            <p className="text-sm text-gray-500">or</p>
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                Browse Files
              </span>
              <input 
                id="file-upload" 
                type="file" 
                className="sr-only" 
                multiple 
                accept="image/*" 
                onChange={handleFileSelect}
              />
            </label>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            Supported file types: PNG, JPG, JPEG, GIF, SVG, WEBP
          </p>
        </div>
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file, index) => (
              <Card key={`${file.name}-${index}`} className="overflow-hidden">
                <div className="aspect-video bg-gray-100 relative">
                  {file.type.startsWith('image/') && (
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={file.name} 
                      className="w-full h-full object-cover"
                    />
                  )}
                  <button 
                    onClick={() => removeFile(index)}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-gray-600" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M6 18L18 6M6 6l12 12" 
                      />
                    </svg>
                  </button>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-6 flex gap-4">
            <Button>
              Process Designs
            </Button>
            <Button variant="outline" onClick={() => setUploadedFiles([])}>
              Clear All
            </Button>
          </div>
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">Tips for best results:</h3>
        <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
          <li>Upload high-resolution mockups for better analysis</li>
          <li>Include all interactive elements in your designs</li>
          <li>For comparison, upload variations with clear differences</li>
          <li>Make sure your designs represent the actual user flow</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadView;
