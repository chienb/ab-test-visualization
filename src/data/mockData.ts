// Mock data for A/B Test Visualization Generator

// Types
export interface DesignVariation {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  dateUploaded: string;
}

export interface ClickPrediction {
  x: number;
  y: number;
  intensity: number; // 0-1 value representing click probability
}

export interface HeatmapData {
  designId: string;
  clickPredictions: ClickPrediction[];
}

export interface MetricData {
  designId: string;
  clickThroughRate: number;
  conversionRate: number;
  engagementTime: number; // in seconds
  addToCartRate: number;
  checkoutCompletionRate: number;
  bounceRate: number;
}

export interface FunnelStep {
  id: string;
  name: string;
  conversionRate: number;
  dropOffRate: number;
}

export interface FunnelData {
  designId: string;
  steps: FunnelStep[];
}

export interface ElementAnalysis {
  elementId: string;
  elementName: string;
  elementType: string;
  clickProbability: number;
  visibilityScore: number;
  attentionScore: number;
  recommendations: string[];
}

// Mock Design Variations
export const designVariations: DesignVariation[] = [
  {
    id: 'design-a',
    name: 'Design A - Current',
    imageUrl: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Product+Page+Design+A',
    description: 'Current design with standard product page layout',
    dateUploaded: '2023-05-15'
  },
  {
    id: 'design-b',
    name: 'Design B - New Layout',
    imageUrl: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Product+Page+Design+B',
    description: 'New design with improved CTA placement and visual hierarchy',
    dateUploaded: '2023-05-15'
  },
  {
    id: 'design-c',
    name: 'Design C - Alternative',
    imageUrl: 'https://placehold.co/800x600/e2e8f0/1e293b?text=Product+Page+Design+C',
    description: 'Alternative design focusing on product imagery',
    dateUploaded: '2023-05-16'
  }
];

// Mock Heatmap Data
export const heatmapData: HeatmapData[] = [
  {
    designId: 'design-a',
    clickPredictions: [
      { x: 400, y: 200, intensity: 0.8 },
      { x: 300, y: 350, intensity: 0.5 },
      { x: 500, y: 400, intensity: 0.3 },
      { x: 200, y: 150, intensity: 0.7 },
      { x: 600, y: 300, intensity: 0.4 },
      { x: 350, y: 250, intensity: 0.6 },
      { x: 450, y: 350, intensity: 0.5 },
      { x: 250, y: 400, intensity: 0.3 },
      { x: 550, y: 200, intensity: 0.4 },
      { x: 400, y: 450, intensity: 0.2 }
    ]
  },
  {
    designId: 'design-b',
    clickPredictions: [
      { x: 400, y: 200, intensity: 0.6 },
      { x: 300, y: 350, intensity: 0.4 },
      { x: 500, y: 400, intensity: 0.9 },
      { x: 200, y: 150, intensity: 0.5 },
      { x: 600, y: 300, intensity: 0.7 },
      { x: 350, y: 250, intensity: 0.4 },
      { x: 450, y: 350, intensity: 0.8 },
      { x: 250, y: 400, intensity: 0.3 },
      { x: 550, y: 200, intensity: 0.6 },
      { x: 400, y: 450, intensity: 0.7 }
    ]
  },
  {
    designId: 'design-c',
    clickPredictions: [
      { x: 400, y: 200, intensity: 0.7 },
      { x: 300, y: 350, intensity: 0.6 },
      { x: 500, y: 400, intensity: 0.5 },
      { x: 200, y: 150, intensity: 0.8 },
      { x: 600, y: 300, intensity: 0.3 },
      { x: 350, y: 250, intensity: 0.7 },
      { x: 450, y: 350, intensity: 0.4 },
      { x: 250, y: 400, intensity: 0.6 },
      { x: 550, y: 200, intensity: 0.5 },
      { x: 400, y: 450, intensity: 0.4 }
    ]
  }
];

// Mock Metric Data
export const metricData: MetricData[] = [
  {
    designId: 'design-a',
    clickThroughRate: 3.2,
    conversionRate: 1.2,
    engagementTime: 45,
    addToCartRate: 2.8,
    checkoutCompletionRate: 1.6,
    bounceRate: 58.4
  },
  {
    designId: 'design-b',
    clickThroughRate: 4.7,
    conversionRate: 1.7,
    engagementTime: 58,
    addToCartRate: 3.9,
    checkoutCompletionRate: 1.96,
    bounceRate: 52.1
  },
  {
    designId: 'design-c',
    clickThroughRate: 4.1,
    conversionRate: 1.5,
    engagementTime: 52,
    addToCartRate: 3.4,
    checkoutCompletionRate: 1.8,
    bounceRate: 54.3
  }
];

// Mock Funnel Data
export const funnelData: FunnelData[] = [
  {
    designId: 'design-a',
    steps: [
      { id: 'step-1', name: 'Page View', conversionRate: 100, dropOffRate: 0 },
      { id: 'step-2', name: 'Product View', conversionRate: 42, dropOffRate: 58 },
      { id: 'step-3', name: 'Add to Cart', conversionRate: 6.7, dropOffRate: 35.3 },
      { id: 'step-4', name: 'Checkout Start', conversionRate: 3.8, dropOffRate: 2.9 },
      { id: 'step-5', name: 'Purchase', conversionRate: 1.2, dropOffRate: 2.6 }
    ]
  },
  {
    designId: 'design-b',
    steps: [
      { id: 'step-1', name: 'Page View', conversionRate: 100, dropOffRate: 0 },
      { id: 'step-2', name: 'Product View', conversionRate: 48, dropOffRate: 52 },
      { id: 'step-3', name: 'Add to Cart', conversionRate: 8.1, dropOffRate: 39.9 },
      { id: 'step-4', name: 'Checkout Start', conversionRate: 4.6, dropOffRate: 3.5 },
      { id: 'step-5', name: 'Purchase', conversionRate: 1.7, dropOffRate: 2.9 }
    ]
  },
  {
    designId: 'design-c',
    steps: [
      { id: 'step-1', name: 'Page View', conversionRate: 100, dropOffRate: 0 },
      { id: 'step-2', name: 'Product View', conversionRate: 45, dropOffRate: 55 },
      { id: 'step-3', name: 'Add to Cart', conversionRate: 7.5, dropOffRate: 37.5 },
      { id: 'step-4', name: 'Checkout Start', conversionRate: 4.2, dropOffRate: 3.3 },
      { id: 'step-5', name: 'Purchase', conversionRate: 1.5, dropOffRate: 2.7 }
    ]
  }
];

// Mock Element Analysis
export const elementAnalysis: ElementAnalysis[] = [
  {
    elementId: 'design-a-cta',
    elementName: 'Add to Cart Button',
    elementType: 'CTA Button',
    clickProbability: 0.28,
    visibilityScore: 0.65,
    attentionScore: 0.58,
    recommendations: [
      'Increase contrast with background',
      'Make button larger',
      'Position closer to product image'
    ]
  },
  {
    elementId: 'design-a-product-image',
    elementName: 'Product Image',
    elementType: 'Image',
    clickProbability: 0.42,
    visibilityScore: 0.78,
    attentionScore: 0.72,
    recommendations: [
      'Increase image size',
      'Add hover zoom functionality',
      'Improve image quality'
    ]
  },
  {
    elementId: 'design-a-price',
    elementName: 'Price Display',
    elementType: 'Text',
    clickProbability: 0.12,
    visibilityScore: 0.54,
    attentionScore: 0.46,
    recommendations: [
      'Increase font size',
      'Add visual emphasis',
      'Position closer to CTA'
    ]
  },
  {
    elementId: 'design-b-cta',
    elementName: 'Add to Cart Button',
    elementType: 'CTA Button',
    clickProbability: 0.39,
    visibilityScore: 0.82,
    attentionScore: 0.76,
    recommendations: [
      'Maintain current contrast',
      'Consider adding subtle animation on hover',
      'Test alternative button text'
    ]
  },
  {
    elementId: 'design-b-product-image',
    elementName: 'Product Image',
    elementType: 'Image',
    clickProbability: 0.47,
    visibilityScore: 0.85,
    attentionScore: 0.81,
    recommendations: [
      'Current size is effective',
      'Consider adding alternative views',
      'Maintain current placement'
    ]
  },
  {
    elementId: 'design-b-price',
    elementName: 'Price Display',
    elementType: 'Text',
    clickProbability: 0.18,
    visibilityScore: 0.72,
    attentionScore: 0.65,
    recommendations: [
      'Current emphasis is effective',
      'Maintain proximity to CTA',
      'Consider adding subtle animation when CTA is hovered'
    ]
  }
];

// Mock comparison insights
export const comparisonInsights = [
  {
    id: 'insight-1',
    title: 'Improved CTA Visibility',
    description: 'Design B\'s call-to-action button receives 62% more attention due to its contrasting color and strategic placement below the product description, directly in the user\'s visual path.',
    impactScore: 8.5
  },
  {
    id: 'insight-2',
    title: 'Enhanced Product Visualization',
    description: 'The larger product images in Design B generate 47% more engagement, leading to increased product understanding and higher likelihood of purchase consideration.',
    impactScore: 7.8
  },
  {
    id: 'insight-3',
    title: 'Streamlined Information Hierarchy',
    description: 'Design B\'s clearer information hierarchy guides users through the content more effectively, resulting in 28.9% longer engagement time and better product understanding.',
    impactScore: 6.9
  },
  {
    id: 'insight-4',
    title: 'Mobile Optimization Improvements',
    description: 'Design B shows a 36.8% improvement in mobile engagement, likely due to the larger touch targets and more scannable content layout.',
    impactScore: 7.2
  }
];

// Mock recommendations
export const recommendations = [
  {
    id: 'rec-1',
    title: 'Implement Design B for Product Pages',
    description: 'Based on the significant improvements across all key metrics, we recommend implementing Design B for all beauty product pages, with particular attention to maintaining the effective CTA placement and color contrast.',
    priority: 'High'
  },
  {
    id: 'rec-2',
    title: 'Further Optimize Mobile Experience',
    description: 'While Design B shows significant improvements for mobile users, consider further optimizations for the checkout process on mobile devices, where the largest drop-off still occurs.',
    priority: 'Medium'
  },
  {
    id: 'rec-3',
    title: 'Conduct Live A/B Test to Validate',
    description: 'While our predictions show strong confidence, we recommend conducting a live A/B test with a small percentage of traffic to validate these findings before full implementation.',
    priority: 'Medium'
  },
  {
    id: 'rec-4',
    title: 'Apply Design B Principles to Other Templates',
    description: 'Consider applying the successful design principles from Design B (clear hierarchy, prominent product imagery, contrasting CTAs) to other page templates in the conversion funnel.',
    priority: 'Low'
  }
];
