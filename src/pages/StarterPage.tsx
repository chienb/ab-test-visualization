import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../components/ui/navigation-menu';
import { Slider } from '../components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ChevronDown } from 'lucide-react';

const StarterPage: React.FC = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Tailwind + shadcn/ui Starter</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Button Components</CardTitle>
            <CardDescription>Various button styles from shadcn/ui</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dropdown Menu</CardTitle>
            <CardDescription>Interactive dropdown component</CardDescription>
          </CardHeader>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  Options <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </div>

      <div className="mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Navigation Menu</CardTitle>
            <CardDescription>Responsive navigation component</CardDescription>
          </CardHeader>
          <CardContent>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                      <NavigationMenuLink asChild>
                        <button className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Introduction</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            A quick introduction to the application
                          </p>
                        </button>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <button className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Documentation</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn how to use the application effectively
                          </p>
                        </button>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                      <NavigationMenuLink asChild>
                        <button className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">UI Components</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Beautifully designed components built with Radix UI and Tailwind CSS
                          </p>
                        </button>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Slider Component</CardTitle>
            <CardDescription>Interactive range slider</CardDescription>
          </CardHeader>
          <CardContent>
            <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tabs Component</CardTitle>
            <CardDescription>Accessible tabbed interface</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="p-4">
                Account settings and preferences.
              </TabsContent>
              <TabsContent value="password" className="p-4">
                Change your password here.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>A/B Test Visualization Generator</CardTitle>
          <CardDescription>Your powerful tool for visualizing and analyzing A/B test results</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            This starter app demonstrates the integration of Tailwind CSS v3 with shadcn/ui components.
            You can use these components to build beautiful and accessible user interfaces for your A/B test visualization application.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Get Started</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StarterPage;
