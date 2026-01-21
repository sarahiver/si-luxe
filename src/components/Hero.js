import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';

// ═══════════════════════════════════════════════════════════════════════════
// LUXE HERO - Theatrical Curtain Reveal
// ═══════════════════════════════════════════════════════════════════════════

const curtainReveal = keyframes`
  0% { transform: scaleY(1); }
  100% { transform: scaleY(0); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const lineGrow = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const scrollPulse = keyframes`
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(8px); opacity: 0.5; }
`;

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--luxe-black);
  overflow: hidden;
`;

const Curtain = styled.div`
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: var(--luxe-charcoal);
  z-index: 100;
  transform-origin: ${p => p.$side === 'left' ? 'top' : 'bottom'};
  animation: ${curtainReveal} 1.5s var(--ease-dramatic) forwards;
  animation-delay: 0.5s;
  
  ${p => p.$side === 'left' && css`
    left: 0;
    transform-origin: top;
  `}
  
  ${p => p.$side === 'right' && css`
    right: 0;
    transform-origin: bottom;
  `}
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, transparent, var(--luxe-gold), transparent);
    
    ${p => p.$side === 'left' && css`right: 0;`}
    ${p => p.$side === 'right' && css`left: 0;`}
  }
`;

const Background = styled.div`
  position: absolute;
  inset: 0;
  
  /* Subtle dot pattern */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.5;
  }
  
  /* Vignette */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 40%, var(--luxe-black) 100%);
  }
`;

const CornerFrame = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  opacity: 0;
  animation: ${fadeUp} 1s var(--ease-luxe) forwards;
  
  ${p => p.$position === 'tl' && css`
    top: 40px; left: 40px;
    border-top: 1px solid var(--luxe-gold);
    border-left: 1px solid var(--luxe-gold);
    animation-delay: 2.2s;
  `}
  ${p => p.$position === 'tr' && css`
    top: 40px; right: 40px;
    border-top: 1px solid var(--luxe-gold);
    border-right: 1px solid var(--luxe-gold);
    animation-delay: 2.3s;
  `}
  ${p => p.$position === 'bl' && css`
    bottom: 40px; left: 40px;
    border-bottom: 1px solid var(--luxe-gold);
    border-left: 1px solid var(--luxe-gold);
    animation-delay: 2.4s;
  `}
  ${p => p.$position === 'br' && css`
    bottom: 40px; right: 40px;
    border-bottom: 1px solid var(--luxe-gold);
    border-right: 1px solid var(--luxe-gold);
    animation-delay: 2.5s;
  `}
  
  @media (max-width: 768px) {
    width: 40px; height: 40px;
    ${p => p.$position.includes('t') && css`top: 20px;`}
    ${p => p.$position.includes('b') && css`bottom: 20px;`}
    ${p => p.$position.includes('l') && css`left: 20px;`}
    ${p => p.$position.includes('r') && css`right: 20px;`}
  }
`;

const HorizontalLine = styled.div`
  position: absolute;
  left: 10%;
  right: 10%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent);
  transform: scaleX(0);
  animation: ${lineGrow} 1.5s ease forwards 2.2s;
  
  ${p => p.$top && css`top: 15%;`}
  ${p => p.$bottom && css`bottom: 15%;`}
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 900px;
  padding: 2rem;
`;

const Eyebrow = styled.div`
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--luxe-gold);
  margin-bottom: 2rem;
  opacity: 0;
  animation: ${fadeUp} 1s var(--ease-luxe) forwards 2.2s;
`;

const Names = styled.h1`
  font-family: var(--font-serif);
  font-weight: 300;
  line-height: 1;
  margin-bottom: 2rem;
  
  .name {
    display: block;
    font-size: clamp(3rem, 12vw, 8rem);
    opacity: 0;
    animation: ${fadeUp} 1s var(--ease-luxe) forwards;
    
    &:nth-child(1) { animation-delay: 2.4s; }
    &:nth-child(3) { animation-delay: 2.8s; }
    
    span {
      background: linear-gradient(90deg, #FFF 0%, var(--luxe-gold) 50%, #FFF 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${shimmer} 3s linear infinite 3.5s;
    }
  }
  
  .ampersand {
    display: block;
    font-size: clamp(1.5rem, 4vw, 3rem);
    font-style: italic;
    color: var(--luxe-gold);
    margin: 0.5rem 0;
    opacity: 0;
    animation: ${fadeUp} 1s var(--ease-luxe) forwards 2.6s;
  }
`;

const DateDisplay = styled.div`
  opacity: 0;
  animation: ${fadeUp} 1s var(--ease-luxe) forwards 3s;
  
  p {
    font-family: var(--font-sans);
    font-size: 0.9rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.5rem;
  }
  
  span {
    font-family: var(--font-serif);
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    font-style: italic;
    color: var(--luxe-white);
    letter-spacing: 0.1em;
  }
`;

const Location = styled.p`
  font-family: var(--font-sans);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 2rem;
  opacity: 0;
  animation: ${fadeUp} 1s var(--ease-luxe) forwards 3.2s;
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  animation: ${fadeUp} 1s var(--ease-luxe) forwards 3.5s;
  
  span {
    font-family: var(--font-sans);
    font-size: 0.6rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
  }
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, var(--luxe-gold), transparent);
  animation: ${scrollPulse} 2s ease-in-out infinite;
`;

function Hero({ weddingData }) {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);
  
  const data = weddingData || {
    name1: 'Victoria',
    name2: 'Alexander',
    date: '12. Oktober 2025',
    location: 'Schloss Benrath, Düsseldorf',
  };
  
  return (
    <Section id="home">
      {/* Theatrical Curtain Reveal */}
      <Curtain $side="left" />
      <Curtain $side="right" />
      
      <Background />
      
      {/* Decorative Corner Frames */}
      <CornerFrame $position="tl" />
      <CornerFrame $position="tr" />
      <CornerFrame $position="bl" />
      <CornerFrame $position="br" />
      
      {/* Horizontal Gold Lines */}
      <HorizontalLine $top />
      <HorizontalLine $bottom />
      
      <Content>
        <Eyebrow>Wir heiraten</Eyebrow>
        
        <Names>
          <span className="name"><span>{data.name1}</span></span>
          <span className="ampersand">&</span>
          <span className="name"><span>{data.name2}</span></span>
        </Names>
        
        <DateDisplay>
          <p>Save the Date</p>
          <span>{data.date}</span>
        </DateDisplay>
        
        <Location>{data.location}</Location>
      </Content>
      
      <ScrollIndicator>
        <span>Entdecken</span>
        <ScrollLine />
      </ScrollIndicator>
    </Section>
  );
}

export default Hero;
