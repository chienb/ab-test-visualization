import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the react-router-dom components
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: () => <div />,
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useLocation: () => ({ pathname: '/' }),
}));

test('renders A/B Test Visualization app', () => {
  render(<App />);
  // Look for text that is likely to be in the header or sidebar
  const appElement = screen.getByText(/A\/B Test/i);
  expect(appElement).toBeInTheDocument();
});
