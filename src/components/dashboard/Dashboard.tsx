import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card.tsx';
import { Button } from '../../components/ui/button.tsx';
import { designVariations, metricData, funnelData } from '../../data/mockData.ts';

const Dashboard: React.FC = () => {
  // Get the best performing design based on conversion rate
  const bestMetric = metricData.reduce((prev, current) => {
    return prev.conversionRate > current.conversionRate ? prev : current;
  });
  
  const bestDesign = designVariations.find(d => d.id === bestMetric.designId) || designVariations[0];

  // Calculate average session duration
  const avgEngagementTime = metricData.reduce((sum, current) => sum + current.engagementTime, 0) / metricData.length;

  // Get funnel data for visualization
  const latestFunnelData = funnelData[0];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to A/B Test Visualization</h1>
        <p className="text-gray-600 max-w-3xl">
          Your powerful tool for visualizing and analyzing A/B test results. Upload your data, compare designs, and get actionable insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Performing Design</CardTitle>
            <CardDescription>Based on conversion rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-full aspect-video bg-gray-100 rounded-md mb-4 overflow-hidden">
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                  {bestMetric.conversionRate.toFixed(1)}% CVR
                </div>
                <img 
                  src="https://placehold.co/800x450/e2e8f0/1e293b?text=Product+Page+Design" 
                  alt={bestDesign.name || "Best design"} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-gray-900">{bestDesign.name}</h3>
                <p className="text-sm text-gray-500">{bestDesign.description}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/comparison" className="w-full">
              <Button className="w-full">View Design Details</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>Latest test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {latestFunnelData.steps.map((step, index) => {
                // For the first step, show 100% width
                // For subsequent steps, use their conversion rate as width
                const widthPercentage = index === 0 ? 100 : step.conversionRate;
                // Ensure minimum width for visibility
                const displayWidth = Math.max(widthPercentage, 15);
                
                return (
                  <div key={step.id} className="relative">
                    {/* Step label on the left */}
                    <div className="flex items-center mb-1">
                      <span className="text-sm font-medium">{step.name}</span>
                      <span className="ml-auto text-sm font-medium text-gray-500">{step.conversionRate.toFixed(1)}%</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="h-8 bg-gray-100 rounded-md w-full relative">
                      <div 
                        className="h-8 bg-blue-500 rounded-md"
                        style={{ width: `${widthPercentage}%` }}
                      />
                    </div>
                    
                    {/* Connector line */}
                    {index < latestFunnelData.steps.length - 1 && (
                      <div className="flex justify-center my-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5L12 19M12 19L19 12M12 19L5 12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/metrics" className="w-full">
              <Button className="w-full" variant="outline">View Full Metrics</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Analyze Metrics</CardTitle>
            <CardDescription>In-depth metrics analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs font-medium">Click-through Rate</div>
                <div className="text-xs font-medium">{metricData[0].clickThroughRate}%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${metricData[0].clickThroughRate * 10}%` }}></div>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs font-medium">Conversion Rate</div>
                <div className="text-xs font-medium">{metricData[0].conversionRate}%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${metricData[0].conversionRate * 20}%` }}></div>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <div className="text-xs font-medium">Bounce Rate</div>
                <div className="text-xs font-medium">{metricData[0].bounceRate}%</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${metricData[0].bounceRate / 2}%` }}></div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/metrics" className="w-full">
              <Button className="w-full" variant="outline">View Metrics</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generate Reports</CardTitle>
            <CardDescription>Create shareable reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-md p-4 flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600 text-sm text-center">
                Generate comprehensive reports with key findings, visualizations, and recommendations for stakeholders.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/report" className="w-full">
              <Button className="w-full" variant="outline">Create Report</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integration</CardTitle>
            <CardDescription>Connect with other tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-md p-4 flex flex-col items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-gray-600 text-sm text-center">
                Integrate with your existing tools and platforms including Google Analytics, HotJar, and more.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/integration" className="w-full">
              <Button className="w-full" variant="outline">Setup Integrations</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
