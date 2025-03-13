import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx';
import { Button } from '../ui/button.tsx';
import { 
  designVariations, 
  metricData, 
  funnelData, 
  heatmapData,
  DesignVariation,
  HeatmapData,
  ClickPrediction
} from '../../data/mockData.ts';

// Define interfaces for type safety
interface Design {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

interface DesignMap {
  [key: string]: Design;
}

interface HeatmapWithObservations {
  imageUrl: string;
  predictions: ClickPrediction[];
  observations: string[];
}

interface HeatmapMap {
  [key: string]: HeatmapWithObservations;
}

const ReportView: React.FC = () => {
  const [selectedDesign, setSelectedDesign] = useState('design-b');
  
  const designs: DesignMap = designVariations.reduce((acc: DesignMap, design: DesignVariation) => ({
    ...acc,
    [design.id]: design
  }), {});
  
  const metrics = {
    clickThrough: {
      name: 'Click-Through Rate',
      designA: metricData[0].clickThroughRate,
      designB: metricData[1].clickThroughRate
    },
    conversion: {
      name: 'Conversion Rate',
      designA: metricData[0].conversionRate,
      designB: metricData[1].conversionRate
    },
    engagement: {
      name: 'Engagement Time',
      designA: metricData[0].engagementTime,
      designB: metricData[1].engagementTime
    },
    addToCart: {
      name: 'Add to Cart Rate',
      designA: metricData[0].addToCartRate,
      designB: metricData[1].addToCartRate
    },
    checkout: {
      name: 'Checkout Completion',
      designA: metricData[0].checkoutCompletionRate,
      designB: metricData[1].checkoutCompletionRate
    }
  };
  
  const insights = [
    {
      title: 'Improved CTA Visibility',
      description: 'Design B shows 32% higher click probability on the main call-to-action button.'
    },
    {
      title: 'Better Product Showcase',
      description: 'Product images in Design B receive more attention, with 28% higher engagement.'
    },
    {
      title: 'Navigation Enhancement',
      description: 'The revised navigation menu structure shows 15% better usability scores.'
    }
  ];
  
  const recommendations = [
    {
      title: "Adopt Design B's CTA Placement",
      description: 'The improved visibility leads to significantly higher engagement.'
    },
    {
      title: 'Review Navigation Structure',
      description: 'Consider further optimizing the menu layout for better usability.'
    },
    {
      title: 'Enhance Visual Hierarchy',
      description: "Apply Design B's emphasis on product imagery across all sections."
    }
  ];
  
  const heatmaps: HeatmapMap = heatmapData.reduce((acc: HeatmapMap, data: HeatmapData) => ({
    ...acc,
    [data.designId]: {
      imageUrl: `heatmap-${data.designId}.png`,
      predictions: data.clickPredictions,
      observations: [
        'High engagement around primary CTA',
        'Strong focus on product imagery',
        'Good navigation visibility'
      ]
    }
  }), {});
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">A/B Test Report</h1>
        <p className="text-gray-600 max-w-3xl">
          Generate comprehensive reports with insights and recommendations based on your design variations.
          Share with stakeholders to support your design decisions with data-driven insights.
        </p>
      </div>
      
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Selected Design:</span>
          <div className="flex rounded-md overflow-hidden">
            <button
              onClick={() => setSelectedDesign('design-a')}
              className={`px-4 py-2 text-sm font-medium ${
                selectedDesign === 'design-a'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Design A
            </button>
            <button
              onClick={() => setSelectedDesign('design-b')}
              className={`px-4 py-2 text-sm font-medium ${
                selectedDesign === 'design-b'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Design B
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button>
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
            Export Report
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-md border border-primary/10">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Key Findings</h3>
                  <p className="text-gray-700">
                    {selectedDesign === 'design-a' 
                      ? "Design A shows strong performance in visual engagement but has lower conversion rates compared to Design B. The clean layout is appealing to users but the call-to-action elements could be improved for better conversion."
                      : "Design B demonstrates superior conversion rates and overall funnel performance. The improved call-to-action visibility and simplified checkout process contribute to a 15% increase in conversion compared to Design A."
                    }
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Design Overview</h3>
                  <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={designs[selectedDesign].imageUrl} 
                      alt={designs[selectedDesign].name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-3 text-gray-700">
                    {designs[selectedDesign].description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(metrics).map(([metricId, metric]) => (
                  <div key={metricId} className="p-4 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium text-gray-700">{metric.name}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {selectedDesign === 'design-a' ? metric.designA : metric.designB}%
                    </p>
                    <div 
                      className={`text-xs font-medium mt-1 ${
                        selectedDesign === 'design-b' 
                          ? metric.designB > metric.designA 
                            ? 'text-green-600' 
                            : 'text-red-600'
                          : metric.designA > metric.designB 
                            ? 'text-green-600' 
                            : 'text-red-600'
                      }`}
                    >
                      {selectedDesign === 'design-b' 
                        ? metric.designB > metric.designA 
                          ? `+${((metric.designB - metric.designA) / metric.designA * 100).toFixed(1)}%` 
                          : `${((metric.designB - metric.designA) / metric.designA * 100).toFixed(1)}%`
                        : metric.designA > metric.designB 
                          ? `+${((metric.designA - metric.designB) / metric.designB * 100).toFixed(1)}%` 
                          : `${((metric.designA - metric.designB) / metric.designB * 100).toFixed(1)}%`
                      } vs. {selectedDesign === 'design-a' ? 'Design B' : 'Design A'}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Conversion Funnel</h3>
                <div className="space-y-3">
                  {funnelData[0].steps.map((stage, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{stage.name}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedDesign === 'design-a' 
                            ? stage.conversionRate 
                            : funnelData[1].steps[index].conversionRate}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ 
                            width: `${selectedDesign === 'design-a' 
                              ? stage.conversionRate 
                              : funnelData[1].steps[index].conversionRate}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Heatmap Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border rounded-md overflow-hidden bg-gray-50">
                <img 
                  src={designs[selectedDesign].imageUrl} 
                  alt={designs[selectedDesign].name} 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 mix-blend-multiply" style={{ opacity: 0.7 }}>
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/50 to-red-500/50" />
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Key Observations</h3>
                <ul className="space-y-2">
                  {heatmaps[selectedDesign].observations.map((observation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                      <p className="text-gray-700">{observation}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{insight.title}</h3>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 text-primary" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" 
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{rec.title}</p>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">1</span>
                  </div>
                  <span className="text-sm text-gray-700">Review findings with stakeholders</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">2</span>
                  </div>
                  <span className="text-sm text-gray-700">Implement recommended changes</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">3</span>
                  </div>
                  <span className="text-sm text-gray-700">Plan follow-up A/B tests</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportView;
