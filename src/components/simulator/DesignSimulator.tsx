import React, { useState, useCallback } from 'react';
import { Button } from '../../components/ui/button.tsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs.tsx';
import { Slider } from '../../components/ui/slider.tsx';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible.tsx';
import { designVariations, heatmapData, elementAnalysis, metricData, funnelData } from '../../data/mockData.ts';

// Component for the upload area
const DesignUploader = ({ 
  designLabel, 
  onFileUpload 
}: { 
  designLabel: string; 
  onFileUpload: (file: File) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
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
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);
  
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFile(file);
      onFileUpload(file);
    }
  }, [onFileUpload]);
  
  const removeFile = useCallback(() => {
    setUploadedFile(null);
  }, []);
  
  // Use a placeholder image if no file is uploaded
  const placeholderImageUrl = designLabel === 'Design A' 
    ? 'https://placehold.co/800x600/e2e8f0/1e293b?text=Product+Page+Design+A'
    : 'https://placehold.co/800x600/e2e8f0/1e293b?text=Product+Page+Design+B';
  
  return (
    <div className="h-full">
      <h3 className="text-lg font-medium mb-2">{designLabel}</h3>
      
      {!uploadedFile ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-[200px] transition-colors ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-300 hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-3">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-10 w-10 ${isDragging ? 'text-primary' : 'text-gray-400'}`}
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
            
            <div className="space-y-1 text-center">
              <p className="text-sm text-gray-500">Drag and drop or</p>
              <label htmlFor={`file-upload-${designLabel}`} className="cursor-pointer">
                <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:bg-primary/90">
                  Browse
                </span>
                <input 
                  id={`file-upload-${designLabel}`} 
                  type="file" 
                  className="sr-only" 
                  accept="image/*" 
                  onChange={handleFileSelect}
                />
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-gray-200 h-[200px]">
          <img 
            src={URL.createObjectURL(uploadedFile)} 
            alt={`${designLabel} Preview`} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={removeFile}
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
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm truncate">
            {uploadedFile.name}
          </div>
        </div>
      )}
      
      {/* Mock data preview - In a real app, we would only show this after upload */}
      {!uploadedFile && (
        <div className="mt-3 text-center">
          <div className="mt-2 border rounded-lg overflow-hidden">
            <img 
              src={placeholderImageUrl}
              alt={`${designLabel} Placeholder`} 
              className="w-full h-[350px] object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Explanation panel component
const ExplanationPanel = ({ 
  title, 
  description, 
  className 
}: { 
  title: string; 
  description: string;
  className?: string;
}) => {
  return (
    <Collapsible className={`w-full border rounded-md ${className}`}>
      <div className="flex items-center justify-between p-3">
        <h4 className="text-sm font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {title}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="p-1 h-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="px-3 pb-3 pt-0 text-sm text-gray-600">
        <p>{description}</p>
      </CollapsibleContent>
    </Collapsible>
  );
};

// Main Design Simulator component
const DesignSimulator: React.FC = () => {
  const [designA, setDesignA] = useState<File | null>(null);
  const [designB, setDesignB] = useState<File | null>(null);
  const [simulated, setSimulated] = useState(false);
  const [selectedTab, setSelectedTab] = useState('heatmap');
  const [heatmapOpacity, setHeatmapOpacity] = useState(50);
  
  const handleSimulate = () => {
    // In a real app, this would trigger API calls to process the designs
    // For our demo, we'll just set simulated to true to show our static results
    setSimulated(true);
  };
  
  // Use mock data for simulation results
  const designAData = designVariations[0];
  const designBData = designVariations[1];
  const heatmapA = heatmapData[0];
  const heatmapB = heatmapData[1];
  const metricsA = metricData[0];
  const metricsB = metricData[1];
  const funnelA = funnelData[0];
  const funnelB = funnelData[1];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Design Simulator</h1>
        <p className="text-gray-600 max-w-3xl">
          Upload your design mockups to simulate user interactions and compare performance metrics.
        </p>
      </div>
      
      {/* Explanation section - Combined both panels into one */}
      <div className="w-full md:w-1/2">
        <ExplanationPanel 
          title="How the Design Simulator Works" 
          description="This tool uses visual attention models and design heuristics to predict how users will interact with your mockups. Our simulation uses Saliency Map algorithms to predict visual attention based on contrast, color, and positioning. We apply Fitts' Law to evaluate element clickability based on size and distance. The results incorporate design heuristics and color psychology principles to provide a comprehensive analysis. Upload two design variations to compare predicted metrics and identify optimization opportunities."
        />
      </div>
      
      {/* Upload Section */}
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle>Upload Your Designs</CardTitle>
          <CardDescription>
            Add two design variations to simulate and compare performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DesignUploader 
              designLabel="Design A" 
              onFileUpload={(file) => setDesignA(file)} 
            />
            <DesignUploader 
              designLabel="Design B" 
              onFileUpload={(file) => setDesignB(file)} 
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch space-y-3">
          <Button className="w-full" onClick={handleSimulate} disabled={simulated}>
            {simulated ? 'Simulated' : 'Simulate'}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Results Section */}
      {simulated && (
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Simulation Results</h2>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="heatmap">Heatmap Analysis</TabsTrigger>
              <TabsTrigger value="metrics">Metrics Comparison</TabsTrigger>
              <TabsTrigger value="insights">Optimization Insights</TabsTrigger>
            </TabsList>
            
            {/* Heatmap Tab */}
            <TabsContent value="heatmap" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Click Heatmap Comparison</CardTitle>
                  <CardDescription>
                    Visualize predicted user click patterns for both designs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Heatmap Opacity: {heatmapOpacity}%
                    </label>
                    <Slider 
                      value={[heatmapOpacity]} 
                      onValueChange={(values) => setHeatmapOpacity(values[0])} 
                      min={0} 
                      max={100} 
                      step={5}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Design A Heatmap */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Design A</h3>
                      <div className="aspect-video bg-gray-100 rounded-md relative overflow-hidden">
                        <img 
                          src={designAData.imageUrl} 
                          alt={designAData.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0">
                          {heatmapA.clickPredictions.map((point, index) => (
                            <div 
                              key={index}
                              className="absolute rounded-full bg-red-500 shadow-lg"
                              style={{
                                left: `${(point.x / 800) * 100}%`,
                                top: `${(point.y / 600) * 100}%`,
                                width: `${Math.max(5, point.intensity * 30)}px`,
                                height: `${Math.max(5, point.intensity * 30)}px`,
                                opacity: (point.intensity * heatmapOpacity) / 100,
                                transform: 'translate(-50%, -50%)',
                                filter: `blur(${point.intensity * 5}px)`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Design B Heatmap */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Design B</h3>
                      <div className="aspect-video bg-gray-100 rounded-md relative overflow-hidden">
                        <img 
                          src={designBData.imageUrl} 
                          alt={designBData.name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0">
                          {heatmapB.clickPredictions.map((point, index) => (
                            <div 
                              key={index}
                              className="absolute rounded-full bg-red-500 shadow-lg"
                              style={{
                                left: `${(point.x / 800) * 100}%`,
                                top: `${(point.y / 600) * 100}%`,
                                width: `${Math.max(5, point.intensity * 30)}px`,
                                height: `${Math.max(5, point.intensity * 30)}px`,
                                opacity: (point.intensity * heatmapOpacity) / 100,
                                transform: 'translate(-50%, -50%)',
                                filter: `blur(${point.intensity * 5}px)`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <ExplanationPanel 
                    title="How to Interpret Heatmaps" 
                    description="Heatmaps visualize where users are most likely to click based on visual attention models. Brighter, more intense areas represent higher click probability. Use this data to ensure your key CTAs are in high-attention areas."
                    className="mt-6"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Metrics Tab */}
            <TabsContent value="metrics" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Metrics Comparison</CardTitle>
                  <CardDescription>
                    Compare predicted performance metrics between designs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Conversion Rate */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Conversion Rate</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-medium">Design A</div>
                            <div className="text-sm font-medium">{metricsA.conversionRate}%</div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${metricsA.conversionRate * 20}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-medium">Design B</div>
                            <div className="text-sm font-medium">{metricsB.conversionRate}%</div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${metricsB.conversionRate * 20}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-green-700 font-medium">
                        Design B outperforms by {((metricsB.conversionRate - metricsA.conversionRate) / metricsA.conversionRate * 100).toFixed(1)}%
                      </div>
                    </div>
                    
                    {/* Add to Cart Rate */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Add to Cart Rate</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-medium">Design A</div>
                            <div className="text-sm font-medium">{metricsA.addToCartRate}%</div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${metricsA.addToCartRate * 10}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-medium">Design B</div>
                            <div className="text-sm font-medium">{metricsB.addToCartRate}%</div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${metricsB.addToCartRate * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-blue-700 font-medium">
                        Design B outperforms by {((metricsB.addToCartRate - metricsA.addToCartRate) / metricsA.addToCartRate * 100).toFixed(1)}%
                      </div>
                    </div>
                    
                    {/* Bounce Rate */}
                    <div>
                      <h3 className="text-lg font-medium mb-2">Bounce Rate</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-medium">Design A</div>
                            <div className="text-sm font-medium">{metricsA.bounceRate}%</div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ width: `${metricsA.bounceRate / 2}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-medium">Design B</div>
                            <div className="text-sm font-medium">{metricsB.bounceRate}%</div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-red-500 h-2 rounded-full" 
                              style={{ width: `${metricsB.bounceRate / 2}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-green-700 font-medium">
                        Design B has {((metricsA.bounceRate - metricsB.bounceRate) / metricsA.bounceRate * 100).toFixed(1)}% lower bounce rate
                      </div>
                    </div>
                  </div>
                  
                  <ExplanationPanel 
                    title="Metrics Prediction Model" 
                    description="Our metrics prediction is based on visual element impact scores, design patterns, and industry benchmarks. The model evaluates CTA visibility, layout friction points, and beauty industry conversion patterns to estimate performance."
                    className="mt-6"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Insights Tab */}
            <TabsContent value="insights" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Insights</CardTitle>
                  <CardDescription>
                    Actionable recommendations to improve your designs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Design A Insights */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-3">Design A Insights</h3>
                      <ul className="space-y-2">
                        {elementAnalysis
                          .filter(element => element.elementId.includes('design-a'))
                          .slice(0, 3)
                          .map((element) => (
                            <li key={element.elementId} className="flex items-start gap-2">
                              <div className="mt-1 text-blue-500 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium">{element.elementName}</div>
                                <div className="text-sm text-gray-600">
                                  {element.recommendations[0]}
                                </div>
                                <div className="mt-1 flex gap-3 text-xs">
                                  <span className="text-blue-700">Click Probability: {(element.clickProbability * 100).toFixed(1)}%</span>
                                  <span className="text-amber-700">Visibility: {(element.visibilityScore * 100).toFixed(1)}%</span>
                                </div>
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    
                    {/* Design B Insights */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-3">Design B Insights</h3>
                      <ul className="space-y-2">
                        {elementAnalysis
                          .filter(element => element.elementId.includes('design-b'))
                          .slice(0, 3)
                          .map((element) => (
                            <li key={element.elementId} className="flex items-start gap-2">
                              <div className="mt-1 text-green-500 flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div>
                                <div className="font-medium">{element.elementName}</div>
                                <div className="text-sm text-gray-600">
                                  {element.recommendations[0]}
                                </div>
                                <div className="mt-1 flex gap-3 text-xs">
                                  <span className="text-blue-700">Click Probability: {(element.clickProbability * 100).toFixed(1)}%</span>
                                  <span className="text-amber-700">Visibility: {(element.visibilityScore * 100).toFixed(1)}%</span>
                                </div>
                              </div>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    
                    {/* Overall Recommendation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-blue-800 mb-2">Overall Recommendation</h3>
                      <p className="text-blue-700">
                        Based on our simulation, <strong>Design B is projected to outperform Design A</strong> by approximately {((metricsB.conversionRate - metricsA.conversionRate) / metricsA.conversionRate * 100).toFixed(1)}% in overall conversion rate. The improved CTA placement and visual hierarchy in Design B contributes to higher engagement metrics.
                      </p>
                    </div>
                  </div>
                  
                  <ExplanationPanel 
                    title="Confidence Scoring" 
                    description="Our recommendations include confidence scores based on prediction variable stability, research correlation strength, and design pattern recognition. Elements with higher scores have more reliable predictions."
                    className="mt-6"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default DesignSimulator;
