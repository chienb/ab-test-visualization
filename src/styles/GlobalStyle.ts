import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    height: 100%;
    font-family: ${theme.fonts.primary};
    font-size: 16px;
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
    line-height: 1.5;
  }
  
  #root {
    height: 100%;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.secondary};
    margin-bottom: ${theme.spacing.md};
    font-weight: 500;
  }
  
  h1 {
    font-size: ${theme.fontSizes.xxlarge};
  }
  
  h2 {
    font-size: ${theme.fontSizes.xlarge};
  }
  
  h3 {
    font-size: ${theme.fontSizes.large};
  }
  
  p {
    margin-bottom: ${theme.spacing.md};
  }
  
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.transitions.short};
    
    &:hover {
      color: ${theme.colors.accent};
    }
  }
  
  button {
    cursor: pointer;
    font-family: ${theme.fonts.primary};
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  ul, ol {
    padding-left: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.md};
  }
`;

export default GlobalStyle;
