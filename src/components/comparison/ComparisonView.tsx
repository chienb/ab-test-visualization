import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx';
import { Button } from '../../components/ui/button.tsx';
import { Slider } from '../../components/ui/slider.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs.tsx';
import { 
  designVariations, 
  heatmapData as mockHeatmapData, 
  elementAnalysis, 
  metricData,
  DesignVariation
} from '../../data/mockData.ts';

const ComparisonView: React.FC = () => {
  const [selectedVariation, setSelectedVariation] = useState<DesignVariation>(designVariations[0]);
  const [selectedTab, setSelectedTab] = useState('visual');
  const [heatmapOpacity, setHeatmapOpacity] = useState(50);

  const handleVariationChange = (variation: DesignVariation) => {
    setSelectedVariation(variation);
  };

  // Find the heatmap data for the selected variation
  const heatmapData = mockHeatmapData.find(h => h.designId === selectedVariation.id);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Design Comparison</h1>
        <p className="text-gray-600 max-w-3xl">
          Compare different design variations and analyze their performance metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Design Variations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {designVariations.map((variation) => (
                <div 
                  key={variation.id}
                  className={`p-4 border rounded-md cursor-pointer transition-colors ${
                    selectedVariation.id === variation.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleVariationChange(variation)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={variation.imageUrl} 
                        alt={variation.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{variation.name}</div>
                      <div className="text-sm text-gray-500 mt-1">{variation.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="visual">Visual Comparison</TabsTrigger>
              <TabsTrigger value="heatmap">Heatmap Analysis</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="visual" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visual Comparison - {selectedVariation.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center">
                    <img 
                      src={selectedVariation.imageUrl} 
                      alt={selectedVariation.name} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    {selectedVariation.description}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="heatmap" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Heatmap Analysis - {selectedVariation.name}</CardTitle>
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
                  <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center relative">
                    <img 
                      src={selectedVariation.imageUrl} 
                      alt={selectedVariation.name} 
                      className="max-h-full max-w-full object-contain"
                    />
                    {heatmapData && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        {/* Render heatmap points */}
                        {heatmapData.clickPredictions.map((point, index) => (
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
                    )}
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {elementAnalysis
                      .filter(element => element.elementId.includes(selectedVariation.id))
                      .slice(0, 3)
                      .map((element) => (
                        <div key={element.elementId} className="bg-gray-50 p-3 rounded-md">
                          <div className="font-medium">{element.elementName}</div>
                          <div className="text-sm text-gray-500">Click Probability: {(element.clickProbability * 100).toFixed(1)}%</div>
                          <div className="text-sm text-gray-500">Visibility: {(element.visibilityScore * 100).toFixed(1)}%</div>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="metrics" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics - {selectedVariation.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(metricData.find(metric => metric.designId === selectedVariation.id) || {})
                      .filter(([key]) => key !== 'designId')
                      .map(([key, value]) => {
                        const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        
                        // Determine color based on metric type
                        let barColor = 'bg-blue-500';
                        if (key === 'conversionRate' || key === 'clickThroughRate' || key === 'addToCartRate' || key === 'checkoutCompletionRate') {
                          barColor = 'bg-green-500';
                        } else if (key === 'bounceRate') {
                          barColor = 'bg-red-500';
                        }
                        
                        // Calculate width based on metric type
                        let width = '50%';
                        if (key === 'conversionRate') {
                          width = `${(value as number) * 20}%`;
                        } else if (key === 'clickThroughRate' || key === 'addToCartRate') {
                          width = `${(value as number) * 10}%`;
                        } else if (key === 'bounceRate') {
                          width = `${(value as number) / 2}%`;
                        } else if (key === 'engagementTime') {
                          width = `${(value as number) / 2}%`;
                        } else {
                          width = `${(value as number) * 15}%`;
                        }
                        
                        return (
                          <div key={key} className="bg-gray-50 p-4 rounded-md">
                            <div className="text-lg font-medium">{formattedKey}</div>
                            <div className="mt-2 text-3xl font-bold text-primary">
                              {typeof value === 'number' ? value.toFixed(1) : value}
                              {key.includes('Rate') ? '%' : ''}
                              {key === 'engagementTime' ? 's' : ''}
                            </div>
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                              <div className={`${barColor} h-2 rounded-full`} style={{ width }}></div>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              {key === 'clickThroughRate' && 'Percentage of users who clicked on the main CTA'}
                              {key === 'conversionRate' && 'Percentage of users who completed a purchase'}
                              {key === 'engagementTime' && 'Average time users spent on the page'}
                              {key === 'addToCartRate' && 'Percentage of users who added items to cart'}
                              {key === 'checkoutCompletionRate' && 'Percentage of users who completed checkout'}
                              {key === 'bounceRate' && 'Percentage of users who left without interaction'}
                            </div>
                          </div>
                        );
                      })
                    }
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline">Export Report</Button>
        <Button>Share Results</Button>
      </div>
    </div>
  );
};

export default ComparisonView;
