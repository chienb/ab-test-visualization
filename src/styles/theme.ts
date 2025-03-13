export const theme = {
  colors: {
    primary: '#c48e8e', // A muted rose color aligned with beauty aesthetics
    secondary: '#f2d0d0',
    accent: '#e7bfc0',
    background: '#ffffff',
    backgroundAlt: '#f9f5f5',
    text: '#333333',
    textLight: '#666666',
    border: '#e0e0e0',
    success: '#5cb85c',
    warning: '#f0ad4e',
    error: '#d9534f',
    info: '#5bc0de',
    chart: {
      heatmap: [
        'rgba(240, 240, 240, 0.6)', // Low intensity
        'rgba(255, 205, 210, 0.7)',
        'rgba(239, 154, 154, 0.7)',
        'rgba(229, 115, 115, 0.8)',
        'rgba(239, 83, 80, 0.8)',    // High intensity
      ]
    }
  },
  fonts: {
    primary: '"Poppins", sans-serif',
    secondary: '"Playfair Display", serif',
  },
  fontSizes: {
    small: '0.875rem',
    medium: '1rem',
    large: '1.25rem',
    xlarge: '1.5rem',
    xxlarge: '2rem',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    circle: '50%',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  transitions: {
    short: '0.2s ease',
    medium: '0.3s ease',
    long: '0.5s ease',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '992px',
    largeDesktop: '1200px',
  },
};
