import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs.tsx';
import { Button } from '../ui/button.tsx';
import { metricData, funnelData } from '../../data/mockData.ts';

interface Metric {
  name: string;
  description: string;
  designA: number;
  designB: number;
}

interface FunnelStage {
  name: string;
  conversionA: number;
  conversionB: number;
  usersA: number;
  usersB: number;
}

interface MockData {
  metrics: Record<string, Metric>;
  funnelData: {
    stages: FunnelStage[];
  };
}

// Mock data structure
const mockData: MockData = {
  metrics: {
    clickThrough: {
      name: 'Click-Through Rate',
      description: 'Percentage of users who click on key elements',
      designA: metricData[0].clickThroughRate,
      designB: metricData[1].clickThroughRate,
    },
    conversion: {
      name: 'Conversion Rate',
      description: 'Percentage of users who complete a purchase',
      designA: metricData[0].conversionRate,
      designB: metricData[1].conversionRate,
    },
    engagement: {
      name: 'Engagement Time',
      description: 'Average time users spend on the page',
      designA: metricData[0].engagementTime,
      designB: metricData[1].engagementTime,
    },
    addToCart: {
      name: 'Add to Cart Rate',
      description: 'Percentage of users who add items to cart',
      designA: metricData[0].addToCartRate,
      designB: metricData[1].addToCartRate,
    },
    checkout: {
      name: 'Checkout Completion',
      description: 'Percentage of users who complete checkout',
      designA: metricData[0].checkoutCompletionRate,
      designB: metricData[1].checkoutCompletionRate,
    },
    bounce: {
      name: 'Bounce Rate',
      description: 'Percentage of users who leave without interaction',
      designA: metricData[0].bounceRate,
      designB: metricData[1].bounceRate,
    },
  },
  funnelData: {
    stages: funnelData[0].steps.map((step, index) => ({
      name: step.name,
      conversionA: step.conversionRate,
      conversionB: funnelData[1].steps[index].conversionRate,
      usersA: Math.round(1000 * (step.conversionRate / 100)),
      usersB: Math.round(1000 * (funnelData[1].steps[index].conversionRate / 100)),
    })),
  },
};

const MetricsView: React.FC = () => {
  const [selectedDesign, setSelectedDesign] = useState('design-b');
  const [selectedTab, setSelectedTab] = useState('engagement');
  
  const metrics = mockData.metrics;
  const { stages } = mockData.funnelData;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Metrics Analysis</h1>
        <p className="text-gray-600 max-w-3xl">
          Analyze predicted engagement metrics and conversion funnel performance for your design variations.
          Compare key metrics and identify opportunities for optimization.
        </p>
      </div>
      
      <div className="flex items-center justify-between mt-8">
        <Tabs value={selectedDesign} onValueChange={setSelectedDesign}>
          <TabsList>
            <TabsTrigger value="design-a">Design A</TabsTrigger>
            <TabsTrigger value="design-b">Design B</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
              />
            </svg>
            Export Data
          </Button>
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mt-4">
        <TabsList className="mb-6">
          <TabsTrigger value="engagement">Engagement Metrics</TabsTrigger>
          <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger>
        </TabsList>
        
        <TabsContent value="engagement" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(metrics).map(([metricId, metric]) => (
              <Card key={metricId}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{metric.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedDesign === 'design-a' ? metric.designA : metric.designB}%
                  </div>
                  
                  <div className="flex items-center">
                    <div 
                      className={`text-sm font-medium ${
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
                      }
                    </div>
                    <span className="text-sm text-gray-500 ml-2">
                      vs. {selectedDesign === 'design-a' ? 'Design B' : 'Design A'}
                    </span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ 
                          width: `${selectedDesign === 'design-a' ? metric.designA : metric.designB}%` 
                        }}
                      ></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">{metric.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Metrics Over Time (Predicted)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex-1 relative">
                  <div className="h-80 bg-gray-50 rounded-md p-4">
                    <div className="w-full h-full flex flex-col">
                      <div className="flex items-center mb-1">
                        <span className="text-sm font-medium">Design A</span>
                        <span className="ml-auto text-sm font-medium text-gray-500">60% (600 users)</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium">Design B</span>
                        <span className="ml-auto text-sm font-medium text-gray-500">65% (650 users)</span>
                      </div>
                      <div className="flex-1 relative">
                        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 w-12 -mt-2">
                          <div>100%</div>
                          <div>80%</div>
                          <div>60%</div>
                          <div>40%</div>
                          <div>20%</div>
                          <div>0%</div>
                        </div>
                        
                        <div className="absolute left-12 right-0 top-0 bottom-0">
                          <div className="w-full h-full relative">
                            <div className="absolute inset-0 flex flex-col justify-between">
                              <div className="border-t border-gray-200 w-full h-0"></div>
                              <div className="border-t border-gray-200 w-full h-0"></div>
                              <div className="border-t border-gray-200 w-full h-0"></div>
                              <div className="border-t border-gray-200 w-full h-0"></div>
                              <div className="border-t border-gray-200 w-full h-0"></div>
                              <div className="border-t border-gray-200 w-full h-0"></div>
                            </div>
                            
                            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                              <path d="M0,180 L100,160 L200,170 L300,150 L400,140 L500,130 L600,120" fill="none" stroke="#3b82f6" strokeWidth="2"></path>
                              <path d="M0,170 L100,150 L200,140 L300,120 L400,100 L500,80 L600,70" fill="none" stroke="#22c55e" strokeWidth="2"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex justify-between text-xs text-gray-500 pl-12">
                        {Array.from({ length: 7 }, (_, i) => (
                          <div key={`day-${i + 1}`}>Day {i + 1}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="funnel" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100vh-200px)]">
                  <div className="h-full bg-gray-50 rounded-md p-4 overflow-auto">
                    <div className="w-full flex flex-col space-y-12 pb-6">
                      {stages.map((stage, index) => (
                        <div key={index} className="relative">
                          <div className="flex items-center mb-1">
                            <span className="text-sm font-medium">{stage.name}</span>
                            <span className="ml-auto text-sm font-medium text-gray-500">{stage.conversionA}% ({stage.usersA} users)</span>
                          </div>
                          <div className="h-8 bg-gray-100 rounded-md w-full relative">
                            {/* Design A funnel bar */}
                            <div 
                              className="h-8 bg-blue-500 rounded-l-md"
                              style={{ width: `${stage.conversionA}%` }}
                            ></div>
                          </div>
                          
                          <div className="flex items-center mb-1">
                            <span className="ml-auto text-sm font-medium text-gray-500">{stage.conversionB}% ({stage.usersB} users)</span>
                          </div>
                          <div className="h-8 bg-gray-100 rounded-md w-full relative">
                            {/* Design B funnel bar */}
                            <div 
                              className="h-8 bg-green-500 rounded-l-md"
                              style={{ width: `${stage.conversionB}%` }}
                            ></div>
                          </div>

                          {index < stages.length - 1 && (
                            <div className="flex justify-center mt-4">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stages.map((stage: FunnelStage, index: number) => {
                      const opportunity = selectedDesign === 'design-a'
                        ? stage.conversionB > stage.conversionA
                        : stage.conversionA > stage.conversionB;
                      
                      if (!opportunity) return null;
                      
                      return (
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 text-yellow-600" 
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
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              Potential improvement in {stage.name.toLowerCase()}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              {selectedDesign === 'design-a'
                                ? `Design B shows ${(stage.conversionB - stage.conversionA).toFixed(1)}% higher conversion at this stage`
                                : `Design A shows ${(stage.conversionA - stage.conversionB).toFixed(1)}% higher conversion at this stage`
                              }
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetricsView;
