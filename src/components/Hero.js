import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--luxe-white);
  padding: 2rem;
  text-align: center;
`;

const GoldLine = styled.div`
  width: 1px;
  height: 40px;
  background: var(--luxe-gold);
  margin-bottom: 2rem;
`;

const Eyebrow = styled.p`
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--luxe-text-muted);
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 7vw, 4.5rem);
  font-weight: 300;
  font-style: italic;
  color: var(--luxe-text-heading);
  line-height: 1.2;
  margin-bottom: 2rem;
  max-width: 700px;
`;

const Subtitle = styled.p`
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 300;
  color: var(--luxe-text-light);
  line-height: 1.9;
  max-width: 500px;
  margin-bottom: 3rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const PrimaryButton = styled.a`
  padding: 1rem 2.5rem;
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--luxe-text);
  background: transparent;
  border: 1px solid var(--luxe-border);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--luxe-gold);
    color: var(--luxe-gold);
  }
`;

const SecondaryButton = styled.a`
  padding: 1rem 2.5rem;
  font-family: var(--font-sans);
  font-size: 0.6rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--luxe-text-muted);
  
  &:hover {
    color: var(--luxe-gold);
  }
`;

function Hero() {
  return (
    <Section id="home">
      <GoldLine />
      <Eyebrow>Save the Date</Eyebrow>
      <Title>Victoria & Alexander</Title>
      <Subtitle>
        14. September 2025 · Schloss Benrath, Düsseldorf
      </Subtitle>
      <ButtonGroup>
        <PrimaryButton href="#rsvp">Zusagen</PrimaryButton>
        <SecondaryButton href="#story">Unsere Geschichte</SecondaryButton>
      </ButtonGroup>
    </Section>
  );
}

export default Hero;
