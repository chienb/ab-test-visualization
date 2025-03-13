import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card.tsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs.tsx';
import { Button } from '../ui/button.tsx';

const IntegrationView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Integration Options</h1>
        <p className="text-gray-600 max-w-3xl">
          Connect your A/B test visualization tool with other platforms and services.
        </p>
      </div>

      <Tabs defaultValue="analytics">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="design">Design Tools</TabsTrigger>
          <TabsTrigger value="testing">Testing Platforms</TabsTrigger>
          <TabsTrigger value="export">Export Options</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Google Analytics</CardTitle>
                <CardDescription>Connect to your GA4 property</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Import experiment data directly from Google Analytics 4 and create visualizations.
                </p>
                <Button className="w-full">Connect</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Adobe Analytics</CardTitle>
                <CardDescription>Connect to Adobe Experience Cloud</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Import experiment data from Adobe Analytics and visualize test results.
                </p>
                <Button className="w-full" variant="outline">Connect</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Mixpanel</CardTitle>
                <CardDescription>Connect to your Mixpanel project</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Import event data from Mixpanel to analyze user behavior in your A/B tests.
                </p>
                <Button className="w-full" variant="outline">Connect</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="design" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Figma</CardTitle>
                <CardDescription>Connect to your Figma designs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Import design variations directly from Figma and compare with live results.
                </p>
                <Button className="w-full">Connect</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Adobe XD</CardTitle>
                <CardDescription>Connect to Adobe XD designs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Import design variations from Adobe XD and overlay with test results.
                </p>
                <Button className="w-full" variant="outline">Connect</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sketch</CardTitle>
                <CardDescription>Connect to your Sketch files</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Import design variations from Sketch and compare with performance data.
                </p>
                <Button className="w-full" variant="outline">Connect</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="testing" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimizely</CardTitle>
                <CardDescription>Connect to Optimizely experiments</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Import experiment data from Optimizely for advanced visualization and analysis.
                </p>
                <Button className="w-full">Connect</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>VWO</CardTitle>
                <CardDescription>Connect to Visual Website Optimizer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Import test data from VWO and create comprehensive visualizations.
                </p>
                <Button className="w-full" variant="outline">Connect</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Google Optimize</CardTitle>
                <CardDescription>Connect to Google Optimize tests</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Import experiment data from Google Optimize for detailed analysis.
                </p>
                <Button className="w-full" variant="outline">Connect</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="export" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>PDF Export</CardTitle>
                <CardDescription>Generate PDF reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Export your visualizations and analysis as a comprehensive PDF report.
                </p>
                <Button className="w-full">Configure</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>PowerPoint</CardTitle>
                <CardDescription>Create presentation slides</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Export your test results as PowerPoint slides for stakeholder presentations.
                </p>
                <Button className="w-full" variant="outline">Configure</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Export</CardTitle>
                <CardDescription>Export raw data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Export raw test data in CSV, JSON, or Excel format for further analysis.
                </p>
                <Button className="w-full" variant="outline">Configure</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationView;
