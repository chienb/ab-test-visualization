import styled from 'styled-components';
import { theme } from './theme';

export const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
  height: 100vh;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "header"
      "main";
  }
`;

export const MainContent = styled.main`
  grid-area: main;
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.backgroundAlt};
  overflow-y: auto;
`;
