import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${p => p.$image});
  background-size: cover;
  background-position: center;
  filter: grayscale(100%) contrast(1.1);
  animation: ${fadeIn} 1.5s ease;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(255,255,255,0.3) 0%,
      rgba(255,255,255,0.1) 40%,
      rgba(255,255,255,0.5) 100%
    );
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
`;

const Eyebrow = styled.p`
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--luxe-text);
  margin-bottom: 1.5rem;
  animation: ${slideUp} 1s ease 0.3s both;
`;

const Names = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(3rem, 10vw, 7rem);
  font-weight: 300;
  font-style: italic;
  color: var(--luxe-text-heading);
  line-height: 1;
  margin-bottom: 1.5rem;
  animation: ${slideUp} 1s ease 0.5s both;
`;

const DateText = styled.p`
  font-family: var(--font-serif);
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-style: italic;
  color: var(--luxe-text);
  margin-bottom: 0.5rem;
  animation: ${slideUp} 1s ease 0.7s both;
`;

const Location = styled.p`
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--luxe-text-light);
  animation: ${slideUp} 1s ease 0.8s both;
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
  animation: ${slideUp} 1s ease 1.2s both;
  cursor: pointer;
`;

const ScrollText = styled.span`
  font-family: var(--font-sans);
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--luxe-text-muted);
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.5; height: 40px; }
  50% { opacity: 1; height: 50px; }
`;

const ScrollLine = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--luxe-gold), transparent);
  animation: ${pulse} 2s ease-in-out infinite;
`;

function Hero({ data }) {
  const config = data || {
    name1: 'Victoria',
    name2: 'Alexander',
    date: '20. Oktober 2026',
    location: 'Schloss Benrath, Düsseldorf',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920',
  };
  
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };
  
  return (
    <Section id="home">
      <BackgroundImage $image={config.image} />
      
      <Content>
        <Eyebrow>Save the Date</Eyebrow>
        <Names>{config.name1} & {config.name2}</Names>
        <DateText>{config.date}</DateText>
        <Location>{config.location}</Location>
      </Content>
      
      <ScrollIndicator onClick={scrollToContent}>
        <ScrollText>Entdecken</ScrollText>
        <ScrollLine />
      </ScrollIndicator>
    </Section>
  );
}

export default Hero;
