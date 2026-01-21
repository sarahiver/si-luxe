import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* ═══════════════════════════════════════════════════════════════════════
     LUXE THEME - Design System
     Aristocratic • Cinematic • High-End • Theatrical
     ═══════════════════════════════════════════════════════════════════════ */
  
  :root {
    /* Core Colors */
    --luxe-black: #0A0A0A;
    --luxe-charcoal: #1A1A1A;
    --luxe-dark: #141414;
    --luxe-gold: #D4AF37;
    --luxe-gold-light: #E5C85E;
    --luxe-gold-dark: #8B7020;
    --luxe-champagne: #F5F0E6;
    --luxe-platinum: #E5E4E2;
    --luxe-cream: #FAF8F5;
    --luxe-white: #FFFFFF;
    
    /* Typography */
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans: 'Montserrat', -apple-system, sans-serif;
    
    /* Spacing */
    --section-padding: clamp(4rem, 10vh, 8rem);
    --container-max: 1400px;
    --content-max: 900px;
    
    /* Transitions */
    --ease-luxe: cubic-bezier(0.23, 1, 0.32, 1);
    --ease-dramatic: cubic-bezier(0.77, 0, 0.175, 1);
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
    background: var(--luxe-black);
    color: var(--luxe-white);
    line-height: 1.6;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Typography Hierarchy */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-serif);
    font-weight: 300;
    line-height: 1.1;
  }
  
  h1 { font-size: clamp(3rem, 10vw, 7rem); }
  h2 { font-size: clamp(2rem, 6vw, 4rem); }
  h3 { font-size: clamp(1.5rem, 4vw, 2.5rem); }
  h4 { font-size: clamp(1.2rem, 3vw, 1.8rem); }
  
  p {
    font-family: var(--font-sans);
    font-weight: 300;
    font-size: 1rem;
    line-height: 1.8;
  }
  
  a {
    color: var(--luxe-gold);
    text-decoration: none;
    transition: all 0.3s var(--ease-luxe);
  }
  
  a:hover {
    color: var(--luxe-gold-light);
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
    font-size: 1rem;
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
    color: var(--luxe-black);
  }
  
  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: var(--luxe-charcoal);
  }
  
  ::-webkit-scrollbar-thumb {
    background: var(--luxe-gold);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: var(--luxe-gold-light);
  }
  
  /* Utility Classes */
  .container {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 2rem;
  }
  
  .gold-text {
    background: linear-gradient(90deg, var(--luxe-white) 0%, var(--luxe-gold) 50%, var(--luxe-white) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
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
