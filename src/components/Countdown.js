import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: var(--section-padding) 2rem;
  background: var(--luxe-cream);
  text-align: center;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--luxe-text-muted);
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: var(--font-serif);
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-style: italic;
  color: var(--luxe-text-heading);
  margin-bottom: 3rem;
`;

const Grid = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  
  @media (max-width: 500px) {
    gap: 1rem;
  }
`;

const Item = styled.div`
  min-width: 80px;
`;

const Number = styled.div`
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3rem);
  font-style: italic;
  color: var(--luxe-text-heading);
  line-height: 1;
  margin-bottom: 0.5rem;
`;

const Label = styled.div`
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--luxe-text-muted);
`;

function Countdown({ weddingDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const targetDate = new Date(weddingDate || '2025-09-14T14:00:00');
  
  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const diff = targetDate - now;
      
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  
  const pad = n => String(n).padStart(2, '0');
  
  return (
    <Section id="countdown">
      <Container>
        <Eyebrow>Countdown</Eyebrow>
        <Title>Bis zum großen Tag</Title>
        
        <Grid>
          <Item>
            <Number>{pad(timeLeft.days)}</Number>
            <Label>Tage</Label>
          </Item>
          <Item>
            <Number>{pad(timeLeft.hours)}</Number>
            <Label>Stunden</Label>
          </Item>
          <Item>
            <Number>{pad(timeLeft.minutes)}</Number>
            <Label>Minuten</Label>
          </Item>
          <Item>
            <Number>{pad(timeLeft.seconds)}</Number>
            <Label>Sekunden</Label>
          </Item>
        </Grid>
      </Container>
    </Section>
  );
}

export default Countdown;
