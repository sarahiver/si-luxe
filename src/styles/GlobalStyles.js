import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* ═══════════════════════════════════════════════════════════════════════
     LUXE THEME - Light & Elegant Design System
     Sophisticated • Minimal • Timeless • Refined
     ═══════════════════════════════════════════════════════════════════════ */
  
  :root {
    /* Core Colors - LIGHT Theme */
    --luxe-white: #FFFFFF;
    --luxe-cream: #FAF9F7;
    --luxe-cream-dark: #F5F3F0;
    --luxe-gray-100: #F0EEEB;
    --luxe-gray-200: #E5E5E5;
    --luxe-gray-300: #D0D0D0;
    --luxe-gray-400: #999999;
    --luxe-gray-500: #777777;
    --luxe-gray-600: #666666;
    --luxe-gray-700: #4D4D4D;
    --luxe-gray-800: #3D3D3D;
    --luxe-gray-900: #2D2D2D;
    --luxe-black: #1A1A1A;
    
    /* Accent Colors */
    --luxe-gold: #B8A369;
    --luxe-gold-light: #C9B87A;
    --luxe-gold-dark: #9A8754;
    --luxe-gold-muted: rgba(184, 163, 105, 0.15);
    
    /* Typography */
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'Montserrat', -apple-system, sans-serif;
    
    /* Spacing */
    --section-padding: clamp(5rem, 12vh, 10rem);
    --container-max: 1200px;
    --content-max: 800px;
    
    /* Transitions */
    --ease-luxe: cubic-bezier(0.23, 1, 0.32, 1);
    --ease-elegant: cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: var(--font-sans);
    background: var(--luxe-white);
    color: var(--luxe-gray-600);
    line-height: 1.7;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Typography Hierarchy */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-serif);
    font-weight: 300;
    font-style: italic;
    color: var(--luxe-gray-900);
    line-height: 1.2;
  }
  
  h1 { font-size: clamp(2.5rem, 8vw, 5rem); }
  h2 { font-size: clamp(2rem, 5vw, 3.5rem); }
  h3 { font-size: clamp(1.5rem, 3vw, 2rem); }
  h4 { font-size: clamp(1.2rem, 2.5vw, 1.5rem); }
  
  p {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: 0.95rem;
    line-height: 1.8;
    color: var(--luxe-gray-600);
  }
  
  a {
    color: var(--luxe-gold);
    text-decoration: none;
    transition: all 0.3s var(--ease-elegant);
  }
  
  a:hover {
    color: var(--luxe-gold-dark);
  }
  
  /* Luxe Buttons */
  button {
    font-family: var(--font-sans);
    cursor: pointer;
    border: none;
    background: none;
  }
  
  /* Form Elements */
  input, textarea, select {
    font-family: var(--font-sans);
    font-size: 0.95rem;
    border: none;
    outline: none;
    background: transparent;
  }
  
  input:focus, textarea:focus {
    outline: none;
  }
  
  /* Selection */
  ::selection {
    background: var(--luxe-gold);
    color: var(--luxe-white);
  }
  
  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--luxe-cream);
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--luxe-gold);
    border-radius: 3px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--luxe-gold-dark);
  }
  
  /* Utility Classes */
  .container {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  /* Hide scrollbar for some elements */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default GlobalStyles;
